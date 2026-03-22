'use client';

export default function Services() {
  const services = {
    exchange: {
      title: "ОБМЕН",
      icon: "💱",
      color: "neon-cyan",
      items: [
        { name: "BTC → RUB", desc: "Bitcoin" },
        { name: "ETH → RUB", desc: "Ethereum" },
        { name: "USDT → RUB", desc: "Tether" },
        { name: "SOL → RUB", desc: "Solana" },
      ],
    },
    international: {
      title: "МЕЖДУНАРОДНЫЕ",
      icon: "🌍",
      color: "neon-purple",
      items: [
        { name: "Таиланд", desc: "Бат, недвижимость" },
        { name: "Китай", desc: "Alipay, WeChat" },
        { name: "США", desc: "USD, банковские карты" },
        { name: "Европа", desc: "EUR, SEPA" },
      ],
    },
    premium: {
      title: "ПРЕМИУМ",
      icon: "⭐",
      color: "neon-pink",
      items: [
        { name: "VIP обмен", desc: "Свой менеджер" },
        { name: "Консультации", desc: "Экспертная помощь" },
        { name: "Обучение", desc: "Крипто для новичков" },
        { name: "Безопасность", desc: "2FA, защита" },
      ],
    },
  };

  return (
    <section id="services" className="relative py-24 px-6">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse" />
            <span className="text-neon-cyan text-sm font-bold tracking-widest uppercase">
              Services
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
            <span className="text-gradient-neon">ПОЛНЫЙ СПЕКТР</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Все для вашей крипты — от обмена до обучения
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(services).map(([key, category], catIndex) => (
            <div
              key={key}
              className="reveal"
              style={{ transitionDelay: `${catIndex * 0.15}s`, opacity: 0 }}
            >
              {/* Category Header */}
              <div className="mb-6">
                <div className={`flex items-center gap-3 mb-4 glass-neo border-${category.color}/30 p-4`}>
                  <div className="text-4xl">{category.icon}</div>
                  <h3 className={`text-2xl font-black text-${category.color}`}>
                    {category.title}
                  </h3>
                </div>
                <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Service Items */}
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`card-cyber p-6 cursor-pointer group hover:border-${category.color}/50 transition-all duration-300`}
                    style={{ transitionDelay: `${(catIndex * 0.15) + (itemIndex * 0.05)}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${category.color}/20 to-${category.color}/5 flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <svg className="w-5 h-5 text-void-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-black text-${category.color} mb-1 group-hover:text-${category.color} transition-colors`}>
                          {item.name}
                        </h4>
                        <p className="text-sm text-text-tertiary">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center reveal" style={{ transitionDelay: "0.6s", opacity: 0 }}>
          <p className="text-lg text-text-secondary mb-8">
            Нужна услуга, которой нет в списке?
          </p>
          <a
            href="#contact"
            className="btn-neon inline-flex items-center gap-2 text-xl"
          >
            СВЯЗАТЬСЯ С НАМИ
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
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
