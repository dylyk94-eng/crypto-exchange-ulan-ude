import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-white/10',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
      role="status"
      aria-label="Загрузка..."
    >
      <span className="sr-only">Загрузка...</span>
    </div>
  );
}
