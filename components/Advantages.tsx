'use client';

export default function Advantages() {
  const advantages = [
    {
      icon: '🔒',
      title: 'Безопасность',
      description: '100% защита ваших средств и личной информации',
    },
    {
      icon: '⚡',
      title: 'Скорость',
      description: 'Обмен криптовалюты за 15 минут',
    },
    {
      icon: '💰',
      title: 'Лучший курс',
      description: 'Фиксированный курс на время сделки',
    },
    {
      icon: '👨‍💼',
      title: 'Менеджер 24/7',
      description: 'Персональное сопровождение на каждом этапе',
    },
    {
      icon: '🌍',
      title: 'Международные',
      description: 'Оплата в Таиланде, Китае и других странах',
    },
    {
      icon: '✅',
      title: 'Надёжность',
      description: '98% довольных клиентов за 2024 год',
    },
  ];

  return (
    <section id="services" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Почему <span className="gradient-text">выбирают</span> нас
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Мы создаём лучший опыт обмена криптовалюты
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, i) => (
            <div
              key={i}
              className="card fade-in"
              style={{ transitionDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <div className="text-5xl mb-6">{advantage.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-12 fade-in" style={{ transitionDelay: '0.6s', opacity: 0 }}>
          <div className="glass-strong rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Готовы начать?
              </h3>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
              </p>
              <a href="#contact" className="btn-primary inline-flex items-center gap-2">
                Оставить заявку
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
