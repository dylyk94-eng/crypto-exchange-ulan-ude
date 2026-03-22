'use client';

import Link from 'next/link';

export default function Cities() {
  const cities = [
    {
      id: 'ulan-ude',
      title: 'УЛАН-УДЭ',
      subtitle: 'Офис • Балтахинова 17',
      description: 'Полный спектр услуг обмена криптовалюты',
      color: 'neon-cyan',
      link: '/city/ulan-ude',
    },
    {
      id: 'chita',
      title: 'ЧИТА',
      subtitle: 'По заявке',
      description: 'Персональное сопровождение',
      color: 'neon-purple',
      link: '/city/chita',
    },
  ];

  return (
    <section id="cities" className="relative py-24 px-6">
      {/* Grid Lines */}
      <div className="grid-lines" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
            <span className="text-neon-cyan text-sm font-bold tracking-widest uppercase">
              Locations
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 glitch-text" data-text="ВЫБЕРИТЕ">
            ВЫБЕРИТЕ
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Два города. Один сервис. <span className="text-neon-cyan font-semibold">Премиум качество.</span>
          </p>
        </div>

        {/* Cyberpunk Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cities.map((city, index) => (
            <Link
              key={city.id}
              href={city.link}
              className="group relative reveal"
              style={{ transitionDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              {/* Card */}
              <div className={`card-cyber ${index === 0 ? 'border-neon-cyan' : 'border-neon-purple'}`}>
                {/* Glitch Header */}
                <div className="mb-6">
                  <h3 className={`text-4xl md:text-5xl font-black ${index === 0 ? 'text-neon-cyan' : 'text-neon-purple'} mb-2 glitch-text`} data-text={city.title}>
                    {city.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse" />
                    <span className="text-neon-lime text-xs font-bold tracking-wider uppercase">
                      {city.subtitle}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  {city.description}
                </p>

                {/* Access Button */}
                <div className={`btn-neon-secondary ${index === 0 ? 'border-neon-cyan text-neon-cyan' : 'border-neon-purple text-neon-purple'}`}>
                  ДОСТУП
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Glow on Hover */}
              <div className={`absolute -inset-1 -inset-1 rounded-lg bg-gradient-to-br ${index === 0 ? 'from-neon-cyan/20 via-neon-cyan/5 to-transparent' : 'from-neon-purple/20 via-neon-purple/5 to-transparent'} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />
            </Link>
          ))}
        </div>

        {/* Global Card */}
        <div className="mt-8 max-w-4xl mx-auto reveal" style={{ transitionDelay: '0.4s', opacity: 0 }}>
          <div className="card-cyber border-neon-pink text-center">
            <h3 className="text-4xl md:text-5xl font-black text-neon-pink mb-2 glitch-text" data-text="МЕЖДУНАРОДНЫЕ ПЛАТЕЖИ">
              МЕЖДУНАРОДНЫЕ ПЛАТЕЖИ
            </h3>
            <p className="text-text-secondary text-lg mb-8">
              Таиланд • Китай • США • Европа
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {['🏝️', '💳', '💴', '🌍'].map((icon, i) => (
                <div
                  key={i}
                  className="w-16 h-16 glass-neo border border-white/10 rounded-xl flex items-center justify-center text-3xl hover:border-neon-pink/50 transition-all duration-300 cursor-pointer hover:scale-110"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal {
          animation: slide 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}
