interface SectionSeparatorProps {
  type?: 'gradient' | 'dashed' | 'dotted';
  className?: string;
}

export default function SectionSeparator({ type = 'gradient', className = '' }: SectionSeparatorProps) {
  if (type === 'gradient') {
    return (
      <div className={`section-divider my-12 ${className}`} />
    );
  }

  if (type === 'dashed') {
    return (
      <div className={`h-px border-t border-dashed border-[var(--line)] my-12 ${className}`} />
    );
  }

  if (type === 'dotted') {
    return (
      <div className={`h-px border-t border-dotted border-[var(--line)] my-12 ${className}`} />
    );
  }

  return (
    <div className={`section-divider my-12 ${className}`} />
  );
}
