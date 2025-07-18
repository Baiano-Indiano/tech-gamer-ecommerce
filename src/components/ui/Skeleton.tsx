import { cn } from '@/lib/utils';
import type { SkeletonProps } from './Skeleton.types';

export function Skeleton({
  className,
  width,
  height,
  borderRadius,
  style,
  isLoaded,
  children,
  ...props
}: SkeletonProps) {
  if (isLoaded) {
    return <>{children}</>;
  }

  const skeletonStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={skeletonStyle}
      {...props}
    />
  );
}
