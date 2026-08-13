export type AssetCategory = 'index' | 'stock' | 'crypto' | 'commodity';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  changePercent: number;
  changeAmount?: number;
  volume?: string;
  marketCap?: string;
  high52?: number;
  low52?: number;
  peRatio?: number;
  openPrice?: number;
  dayHigh?: number;
  dayLow?: number;
  badgeText?: string;
  badgeColor?: string; // CSS color or Tailwind class
  chartData: number[]; // Array of price history points for sparkline/modal chart
  sparklinePath?: string; // SVG path if pre-generated
  description?: string;
  exchange?: string;
  unit?: string;
}

export interface AIAnalysis {
  summary: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  score: number; // 0 - 100
  keyDrivers: string[];
  technicalOutlook: string;
}

export type NavTab = 'markets' | 'products' | 'community' | 'brokers';

export type RegionFilter = 'US' | 'Global' | 'Europe' | 'Asia' | 'Crypto' | 'Futures';

export interface Broker {
  id: string;
  name: string;
  logoLetter: string;
  logoBg: string;
  minDeposit: string;
  maxLeverage: string;
  avgSpread: string;
  executionSpeed: string;
  rating: number;
  features: string[];
  regulatedBy: string[];
  isPopular?: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
  features: string[];
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  handle: string;
  timeAgo: string;
  title: string;
  content: string;
  assetSymbol?: string;
  sentiment?: 'Bullish' | 'Bearish';
  likes: number;
  comments: number;
  shares: number;
}
