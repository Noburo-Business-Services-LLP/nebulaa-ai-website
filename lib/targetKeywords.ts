import { readJson, writeJson } from '@/lib/s3Store'

/**
 * Which keyword a page is written to rank for — a page → keyword map, not a
 * field on any content type. Nothing here is pre-filled: guessing a target
 * keyword for 130+ pages without knowing search intent would just be
 * fabricated data with a confident-looking dashboard around it. This starts
 * empty and is meant to be filled in through /admin/seo as pages are
 * actually assigned a keyword strategy.
 */

const KEY = 'seo/target-keywords.json'

export type TargetKeywordMap = Record<string, string>

export async function getTargetKeywords(): Promise<TargetKeywordMap> {
  return readJson<TargetKeywordMap>(KEY, {})
}

export async function setTargetKeyword(path: string, keyword: string): Promise<boolean> {
  const all = await getTargetKeywords()
  if (keyword.trim()) all[path] = keyword.trim()
  else delete all[path]
  return writeJson(KEY, all)
}
