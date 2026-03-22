interface SectionSeparatorProps {
  type?: 'gradient' | 'dashed' | 'dotted';
  className?: string;
}

export default function SectionSeparator({ type = 'gradient', className = '' }: SectionSeparatorProps) {
  if (type === 'gradient') {
    return (
      <div className={`h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12 ${className}`} />
    );
  }

  if (type === 'dashed') {
    return (
      <div className={`h-px border-t border-dashed border-white/20 my-12 ${className}`} />
    );
  }

  if (type === 'dotted') {
    return (
      <div className={`h-px border-t border-dotted border-white/15 my-12 ${className}`} />
    );
  }

  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12 ${className}`} />
  );
}
