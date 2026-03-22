interface ImagePlaceholderProps {
  type?: 'city' | 'office' | 'service' | 'avatar';
  width?: number;
  height?: number;
  className?: string;
  icon?: string;
  title?: string;
}

export default function ImagePlaceholder({
  type = 'office',
  width = 400,
  height = 300,
  className = '',
  icon,
  title,
}: ImagePlaceholderProps) {
  const icons = {
    city: '🏙️',
    office: '🏢',
    service: '💼',
    avatar: '👤',
  };

  const gradients = {
    city: 'from-indigo-500/20 to-purple-500/10',
    office: 'from-purple-500/20 to-pink-500/10',
    service: 'from-pink-500/20 to-indigo-500/10',
    avatar: 'from-indigo-500/30 to-purple-500/20',
  };

  const defaultIcon = icon || icons[type];

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradients[type]} ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={title || 'Placeholder image'}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
      }} />

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl opacity-60">
          {defaultIcon}
        </div>
      </div>

      {/* Gradient border */}
      <div className="absolute inset-0 border-2 border-white/10 rounded-lg" />

      {/* Loading indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-black/20 rounded-full text-xs text-white/60">
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
        <span>Image</span>
      </div>
    </div>
  );
}
