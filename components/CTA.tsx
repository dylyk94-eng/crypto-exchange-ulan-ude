'use client';

export default function CTA() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <div className="glass-strong rounded-3xl p-12 text-center fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-green-400">Открыто сейчас</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы начать <span className="gradient-text">обменивать</span> крипту?
          </h2>

          {/* Description */}
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Оставьте заявку прямо сейчас — наш менеджер свяжется с вами в течение 15 минут.
            Безопасно, быстро, надёжно.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/5">
              <div className="text-3xl font-bold gradient-text mb-2">15 мин</div>
              <div className="text-white/60 text-sm">Среднее время обмена</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <div className="text-white/60 text-sm">Безопасность гарантируется</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-white/60 text-sm">Поддержка в Telegram</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#contact"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Оставить заявку
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="https://t.me/Crypto_u_u"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.169.325.015.093.034.305.019.471z"/>
              </svg>
              Написать в Telegram
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-10 pt-10 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+7 999 999 99 99</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ежедневно 12:00–18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Улан-Удэ, ул. Балтахинова, 17</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
