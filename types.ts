import { LucideIcon } from 'lucide-react';

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Statistic {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}