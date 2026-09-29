import {
  BedDouble, UtensilsCrossed, Palmtree, Camera, Star, MapPin, Gem, Sparkles, Crown, Heart, Shirt, Scissors,
  ShoppingBag, Tag, Landmark, PiggyBank, ShieldCheck, Users, Wallet, BadgeCheck, Cookie, Coffee, Wheat,
  ShoppingBasket, Building2, Home, Key, Trees, Sofa, Lamp, Refrigerator, Truck, Car, Wrench, Gauge, Factory,
  Package, Settings, Clapperboard, PartyPopper, MessageSquareHeart, Gift, Images, Megaphone, CalendarHeart,
  type LucideIcon,
} from 'lucide-react'

/** Six icons per industry, floated beside the page hero so it is never a wall of text. */
export const industryIcons: Record<string, LucideIcon[]> = {
  'hospitality': [BedDouble, UtensilsCrossed, Palmtree, Camera, Star, MapPin],
  'jewellery-retail': [Gem, Sparkles, Crown, Heart, Camera, Star],
  'textile-apparel': [Shirt, Scissors, Sparkles, ShoppingBag, Camera, Tag],
  'financial-services': [Landmark, PiggyBank, ShieldCheck, Users, Wallet, BadgeCheck],
  'fmcg-food': [Cookie, Coffee, Wheat, ShoppingBasket, Camera, Star],
  'real-estate': [Building2, Home, Key, MapPin, Camera, Trees],
  'furniture-appliances': [Sofa, Lamp, Refrigerator, Truck, Camera, Tag],
  'automobiles': [Car, Key, Wrench, Gauge, Camera, Star],
  'industrial-b2b': [Factory, Wrench, Package, Truck, Users, Settings],
}

/** What we post, as the running strip on every industry page. */
export const postTypes: { label: string; icon: LucideIcon; tint: string }[] = [
  { label: 'Reels', icon: Clapperboard, tint: 'bg-peach' },
  { label: 'Festival posts', icon: PartyPopper, tint: 'bg-sky' },
  { label: 'Offers', icon: Tag, tint: 'bg-mint' },
  { label: 'Customer stories', icon: MessageSquareHeart, tint: 'bg-lav' },
  { label: 'Product photos', icon: Camera, tint: 'bg-peach' },
  { label: 'Carousels', icon: Images, tint: 'bg-sky' },
  { label: 'New arrivals', icon: Gift, tint: 'bg-mint' },
  { label: 'Announcements', icon: Megaphone, tint: 'bg-lav' },
  { label: 'Season calendar', icon: CalendarHeart, tint: 'bg-peach' },
  { label: 'Reviews', icon: Star, tint: 'bg-sky' },
]
