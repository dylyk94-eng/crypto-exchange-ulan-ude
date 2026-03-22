'use client';

export default function Particles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 20,
    color: ['neon-cyan', 'neon-purple', 'neon-pink', 'neon-lime'][Math.floor(Math.random() * 4)],
    speed: Math.random() * 20 + 15,
  }));

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle-${particle.color}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.speed}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
