import {
  Target, CalendarDays, Sparkles, Clapperboard, Rocket, CircleCheck, Eye, Users, Inbox, Search, Palette, Brain,
  UploadCloud, BarChart3, MessageCircle, ListChecks, Megaphone, Phone, Bot, Workflow, BookOpen, Mail,
  ClipboardList, MapPin, Filter, AtSign, Send, Database, Zap, Instagram, Facebook, Linkedin, Twitter, Youtube,
  MessageSquare, Store, Pin, ShoppingCart, Compass, TrendingUp, Camera, Handshake, FileBarChart, CalendarHeart,
  type LucideIcon,
} from 'lucide-react'

/** One icon per product capability, so no card on the product pages is only text. */
const ICONS: Record<string, LucideIcon> = {
  // channels
  'instagram': Instagram, 'facebook': Facebook, 'linkedin': Linkedin, 'x': Twitter, 'youtube-shorts': Youtube,
  'email': Mail, 'sms': MessageSquare, 'voice': Phone, 'google-business-profile': Store, 'pinterest': Pin,
  'meta-google-ads': Megaphone, 'quick-commerce': ShoppingCart,
  // services
  'market-entry': Rocket, 'btl-activation': Handshake, 'performance-marketing': TrendingUp,
  'influencer-marketing': Users, 'content-production': Camera, 'strategy': Compass, 'reporting': BarChart3,
  // resources
  'festival-calendar': CalendarHeart, 'market-entry-playbook': BookOpen, 'btl-activation-checklist': ListChecks,
  'whatsapp-reply-templates': MessageCircle, 'content-calendar-template': CalendarDays, 'monthly-report-template': FileBarChart,
  'strategy-icp': Target,
  'content-planning': CalendarDays,
  'create': Sparkles,
  'reels': Clapperboard,
  'campaigns': Rocket,
  'approvals': CircleCheck,
  'competitors': Eye,
  'influencers': Users,
  'unified-inbox': Inbox,
  'seo-assistant': Search,
  'brand-assets': Palette,
  'ai-memory': Brain,
  'upload-schedule': UploadCloud,
  'analytics': BarChart3,
  'whatsapp': MessageCircle,
  'leads': ListChecks,
  'broadcasts': Megaphone,
  'voice-calling': Phone,
  'ai-agents': Bot,
  'automation': Workflow,
  'knowledge-base': BookOpen,
  'email-sms': Mail,
  'tasks-activities': ClipboardList,
  'lead-sourcing': MapPin,
  'lead-qualification': Filter,
  'email-enrichment': AtSign,
  'personalized-outreach': Send,
  'crm-sync': Database,
}

export const TINTS = ['bg-peach', 'bg-sky', 'bg-mint', 'bg-lav'] as const

export function capabilityIcon(slug: string): LucideIcon {
  return ICONS[slug] ?? Zap
}
