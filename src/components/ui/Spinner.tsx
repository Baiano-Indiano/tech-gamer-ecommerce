import { cn } from '@/lib/utils';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-2',
  };

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-gray-200 border-t-primary-500',
          sizeClasses[size]
        )}
        style={{ animationDuration: '1s' }}
        role="status"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
}
