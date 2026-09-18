import fs from 'fs'
import path from 'path'
import type { AuditSummary } from '@/lib/seoAudit'

/**
 * Every audit run, kept — not just the latest one overwritten in place.
 * lib/seoAudit.ts still writes the full per-page detail to S3 as
 * "current state," but that gets replaced on every run; this is the
 * timeline that makes "are we actually improving" answerable, which is
 * exactly the shape a flat JSON blob is wrong for. DynamoDB in production
 * (partition key is the metric stream, sort key is the run timestamp, so
 * one Query returns the whole trend in order); a per-timestamp JSON file
 * under data/seo/history/ locally, same read/write-per-environment split
 * every other store in this app already uses.
 */

export interface AuditHistoryPoint {
  runAt: string
  pageCount: number
  titleCoverage: number
  goodTitleLengthPct: number
  metaDescriptionCoverage: number
  goodMetaLengthPct: number
  canonicalWwwConsistency: number
  imageAltCoverage: number | null
  structuredDataCoverage: number
  missingH1Count: number
  multipleH1Count: number
  brokenInternalLinksCount: number
  pagesWithTargetKeyword: number
  pagesWithKeywordFullyPlaced: number
}

const STREAM = 'seo-audit'
const localDir = path.join(process.cwd(), 'data', 'seo', 'history')

function toPoint(summary: AuditSummary): AuditHistoryPoint {
  return {
    runAt: summary.runAt,
    pageCount: summary.pageCount,
    titleCoverage: summary.titleCoverage,
    goodTitleLengthPct: summary.goodTitleLengthPct,
    metaDescriptionCoverage: summary.metaDescriptionCoverage,
    goodMetaLengthPct: summary.goodMetaLengthPct,
    canonicalWwwConsistency: summary.canonicalWwwConsistency,
    imageAltCoverage: summary.imageAltCoverage,
    structuredDataCoverage: summary.structuredDataCoverage,
    missingH1Count: summary.missingH1Count,
    multipleH1Count: summary.multipleH1Count,
    brokenInternalLinksCount: summary.brokenInternalLinks.length,
    pagesWithTargetKeyword: summary.pagesWithTargetKeyword,
    pagesWithKeywordFullyPlaced: summary.pagesWithKeywordFullyPlaced,
  }
}

let ddbClient: import('@aws-sdk/lib-dynamodb').DynamoDBDocumentClient | null = null
async function ddb() {
  if (!ddbClient) {
    const { DynamoDBClient } = await import('@aws-sdk/client-dynamodb')
    const { DynamoDBDocumentClient } = await import('@aws-sdk/lib-dynamodb')
    ddbClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION || 'ap-south-1' }))
  }
  return ddbClient
}

export async function recordAuditHistory(summary: AuditSummary): Promise<void> {
  const point = toPoint(summary)
  const table = process.env.METRICS_TABLE

  if (!table) {
    fs.mkdirSync(localDir, { recursive: true })
    // Colon-safe filename; sorts chronologically as-is since it's still an ISO timestamp.
    const file = path.join(localDir, `${point.runAt.replace(/:/g, '-')}.json`)
    fs.writeFileSync(file, JSON.stringify(point, null, 2))
    return
  }

  const { PutCommand } = await import('@aws-sdk/lib-dynamodb')
  await (await ddb()).send(
    new PutCommand({ TableName: table, Item: { pk: STREAM, sk: point.runAt, ...point } }),
  )
}

export async function getAuditHistory(limit = 90): Promise<AuditHistoryPoint[]> {
  const table = process.env.METRICS_TABLE

  if (!table) {
    if (!fs.existsSync(localDir)) return []
    const files = fs.readdirSync(localDir).filter(f => f.endsWith('.json')).sort()
    const points = files.map(f => JSON.parse(fs.readFileSync(path.join(localDir, f), 'utf8')) as AuditHistoryPoint)
    return points.slice(-limit)
  }

  const { QueryCommand } = await import('@aws-sdk/lib-dynamodb')
  const res = await (await ddb()).send(
    new QueryCommand({
      TableName: table,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': STREAM },
      ScanIndexForward: true,
      Limit: limit,
    }),
  )
  return (res.Items ?? []) as AuditHistoryPoint[]
}
