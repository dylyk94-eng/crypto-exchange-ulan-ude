'use client';

export default function News() {
  const news = [
    {
      date: '20.03.2026',
      title: 'Открыли офис в Чите',
      description: 'Теперь можем принимать заявки в Чите и проводить обмены по предварительной договорённости.',
      badge: 'Новое',
      icon: '🏢',
    },
    {
      date: '15.03.2026',
      title: 'Поддержка Solana',
      description: 'Теперь можно обменивать SOL на рубли и обратно. Фиксированный курс на время сделки.',
      badge: 'Обновление',
      icon: '💎',
    },
    {
      date: '10.03.2026',
      title: 'Ускорение обменов',
      description: 'Обмены теперь занимают не более 10 минут благодаря новым процедурам.',
      badge: 'Улучшение',
      icon: '⚡',
    },
  ];

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="badge badge-hot">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              Новости
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Последние <span className="gradient-text">обновления</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Будьте в курсе последних новостей нашего сервиса
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{ transitionDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold text-indigo-400">{item.badge}</span>
                </div>
                <span className="text-sm text-white/50">{item.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="text-center mt-8 fade-in" style={{ transitionDelay: '0.4s', opacity: 0 }}>
          <a
            href="#"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Все новости
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
