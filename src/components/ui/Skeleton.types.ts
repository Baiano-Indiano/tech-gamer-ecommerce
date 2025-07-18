import type { CSSProperties } from 'react';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: CSSProperties;
  isLoaded?: boolean;
  children?: React.ReactNode;
  speed?: number;
  baseColor?: string;
  highlightColor?: string;
  count?: number;
  circle?: boolean;
  enableAnimation?: boolean;
}
