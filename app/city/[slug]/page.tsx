'use client';

import { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Marquee from '@/components/Marquee';
import Contact from '@/components/Contact';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgress from '@/components/ScrollProgress';

const cities = {
  'ulan-ude': {
    name: 'Улан-Удэ',
    title: 'Криптообмен в Улан-Удэ',
    description: 'Покупка, продажа и обмен криптовалюты в премиальном формате. Работаем с USDT, BTC, ETH и другими активами.',
    seoTitle: 'CryptoX — обмен криптовалюты в Улан-Удэ',
    seoDescription: 'CryptoX в Улан-Удэ: Балтахинова, 17. Покупка, продажа и обмен криптовалюты, платежи в Таиланд, выдача бат, пополнение Alipay, WeChat и банковских карт Китая.',
    offices: [
      {
        address: 'ул. Балтахинова, 17',
        schedule: 'Ежедневно · 12:00–18:00',
        contact: '@Crypto_u_u',
        image: '/offices/ulan-ude-main.png',
      },
    ],
    stats: {
      clients: '5000+',
      transactions: '80000+',
      rating: '4.9',
    },
  },
  'chita': {
    name: 'Чита',
    title: 'Криптообмен в Чите',
    description: 'Принимаем заявки на покупку, продажу и обмен криптовалюты, а также на международные расчёты по Таиланду и Китаю.',
    seoTitle: 'CryptoX — обмен криптовалюты в Чите',
    seoDescription: 'CryptoX в Чите: покупка, продажа и обмен криптовалюты, платежи в Таиланд, выдача бат, Alipay, WeChat и банковские карты Китая.',
    offices: [
      {
        address: 'По предварительной заявке',
        schedule: 'По согласованию с менеджером',
        contact: '@Crypto_u_u',
        image: '/offices/chita-main.png',
      },
    ],
    stats: {
      clients: '2000+',
      transactions: '20000+',
      rating: '4.8',
    },
  },
};

export default function CityPage() {
  const params = useParams();
  const slug = params.slug as string;
  const city = cities[slug as keyof typeof cities];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (!city) {
    notFound();
  }

  return (
    <div className="relative">
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />

      <Header />

      <main id="main" className="relative z-10" tabIndex={-1}>
        {/* Hero */}
        <section className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl fade-in">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="badge">📍 {city.name}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">{city.title}</span>
              </h1>
              <p className="text-xl text-white/70 mb-8">
                {city.description}
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="https://t.me/Crypto_u_u"
                  target="_blank"
                  rel="noopener"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.169.325.015.093.034.305.019.471z"/>
                  </svg>
                  Написать в Telegram
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Оставить заявку
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Marquee />

        {/* Stats */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { value: city.stats.clients, label: 'Довольных клиентов', icon: '👥' },
                { value: city.stats.transactions, label: 'Успешных транзакций', icon: '📊' },
                { value: city.stats.rating, label: 'Средний рейтинг', icon: '⭐' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="card text-center fade-in"
                  style={{ transitionDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Почему выбирают <span className="gradient-text">{city.name}</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🏢', title: 'Собственный офис', desc: 'Встречаемся лично в удобном месте' },
                { icon: '⚡', title: 'Быстро', desc: 'Обмен за 15 минут без задержек' },
                { icon: '💰', title: 'Лучший курс', desc: 'Фиксируем курс на время сделки' },
                { icon: '👨‍💼', title: 'Персональный менеджер', desc: 'Поддержка на каждом этапе' },
                { icon: '🔒', title: 'Безопасно', desc: '100% защита ваших средств' },
                { icon: '📱', title: 'Связь 24/7', desc: 'Всегда на связи в Telegram' },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="card fade-in"
                  style={{ transitionDelay: `${(i + 3) * 0.1}s`, opacity: 0 }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Services />

        <Testimonials />

        <FAQ />

        <Contact />

        <div className="py-12 px-6">
          <div className="max-w-7xl mx-auto text-center fade-in">
            <h3 className="text-2xl font-bold text-white mb-4">
              Готовы начать обменять криптовалюту в {city.name}?
            </h3>
            <a
              href="#contact"
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
            >
              Оставить заявку сейчас
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
