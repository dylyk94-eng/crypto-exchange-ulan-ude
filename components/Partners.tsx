'use client';

export default function Partners() {
  const partners = [
    { name: 'CryptoCompare', description: 'API для курсов криптовалют' },
    { name: 'Telegram', description: 'Мессенджер для связи' },
    { name: 'Yandex', description: 'Карты и навигация' },
    { name: 'Mastercard', description: 'Оплата картами' },
    { name: 'Visa', description: 'Оплата картами' },
  ];

  return (
    <section className="py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h3 className="text-2xl font-bold text-white mb-4">
            Мы работаем с лучшими
          </h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            Наши партнёры гарантируют надёжность и качество услуг
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass p-6 rounded-2xl text-center hover:bg-white/10 transition-all fade-in"
              style={{ transitionDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-3xl">
                  {['💰', '📱', '🗺️', '💳', '💳'][index]}
                </span>
              </div>
              <h4 className="text-white font-semibold mb-1">{partner.name}</h4>
              <p className="text-sm text-white/50">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
