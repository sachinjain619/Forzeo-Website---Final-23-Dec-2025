import { 
  BarChart3, 
  Search, 
  Bot, 
  Zap, 
  Target, 
  Share2, 
  LineChart, 
  ShieldCheck,
  Globe,
  Cpu
} from 'lucide-react';
import { PricingTier, FeatureItem, Statistic, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Platform', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#resources' },
];

export const STATISTICS: Statistic[] = [
  { value: '3x', label: 'More mentions in AI answers' },
  { value: '41%', label: 'Increase in qualified traffic' },
  { value: '-60%', label: 'Reduction in brand hallucinations' },
];

export const CORE_FEATURES: FeatureItem[] = [
  {
    title: 'AI Visibility Tracking',
    description: 'See where your brand is referenced across major AI systems like ChatGPT, Gemini, and Perplexity.',
    icon: Globe,
  },
  {
    title: 'Share-of-Voice Analysis',
    description: 'Compare your presence vs competitors across categories in generated responses.',
    icon: BarChart3,
  },
  {
    title: 'AI Sentiment Engine',
    description: 'Understand how AI models describe your brand—accuracy, tone, strengths, and hallucinations.',
    icon: Bot,
  },
  {
    title: 'Action Engine',
    description: 'Get step-by-step guidance to grow citations, optimize schema, and influence model references.',
    icon: Zap,
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$199',
    description: 'For individuals & small teams starting their GEO journey.',
    features: ['5 Keywords Tracked', 'Weekly AI Visibility Audit', 'Basic Sentiment Analysis', '1 User Seat'],
    recommended: false,
  },
  {
    name: 'Growth',
    price: '$499',
    description: 'For scaling brands needing deeper intelligence.',
    features: ['25 Keywords Tracked', 'Daily Visibility Updates', 'Competitor Comparison', 'Schema Optimization Tools', '3 User Seats'],
    recommended: true,
  },
  {
    name: 'Pro',
    price: '$999',
    description: 'For agencies & dedicated SEO teams.',
    features: ['100 Keywords Tracked', 'Real-time Alerts', 'Advanced API Access', 'White-label Reports', '10 User Seats'],
    recommended: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Full-scale domination for global organizations.',
    features: ['Unlimited Tracking', 'Dedicated Analyst', 'Custom LLM Training Data', 'SSO & Compliance', '24/7 Priority Support'],
    recommended: false,
  },
];

export const TRUSTED_BRANDS = [
  'TechFlow', 'SaaSify', 'CloudScale', 'Nebula', 'Vertex'
];