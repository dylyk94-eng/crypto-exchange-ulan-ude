'use client';

import { useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Александр',
      city: 'Улан-Удэ',
      rating: 5,
      text: 'Отличный сервис! Обменял USDT на рубли за 10 минут. Менеджер очень вежливый, курс отличный. Рекомендую!',
      date: '2 недели назад',
      avatar: '👨',
    },
    {
      name: 'Мария',
      city: 'Чита',
      rating: 5,
      text: 'Первый раз использовала криптообменник. Очень боялась, но всё прошло супер! Всё объяснили, помогли на каждом этапе.',
      date: '3 недели назад',
      avatar: '👩',
    },
    {
      name: 'Дмитрий',
      city: 'Улан-Удэ',
      rating: 5,
      text: 'Регулярно меняю крипту здесь уже полгода. Всегда стабильный курс, быстрая работа, никаких скрытых комиссий.',
      date: '1 месяц назад',
      avatar: '👨‍💼',
    },
    {
      name: 'Елена',
      city: 'Чита',
      rating: 5,
      text: 'Нужна была помощь с оплатой недвижимости в Таиланде. Менеджер объяснил всё доступно, помог с переводом бат.',
      date: '2 месяца назад',
      avatar: '👩‍💼',
    },
    {
      name: 'Сергей',
      city: 'Улан-Удэ',
      rating: 4,
      text: 'Хороший сервис, быстро и надёжно. Минус - иногда бывает очередь в офисе в вечернее время.',
      date: '3 месяца назад',
      avatar: '👨',
    },
    {
      name: 'Анна',
      city: 'Улан-Удэ',
      rating: 5,
      text: 'Пользуюсь сервисом уже год! Всегда помогаю друзьям найти надёжный обменник. Спасибо за работу!',
      date: '4 месяца назад',
      avatar: '👩',
    },
  ];

  const [filter, setFilter] = useState<'all' | 'ulan-ude' | 'chita'>('all');

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.city.toLowerCase().includes(filter === 'ulan-ude' ? 'улан' : 'чита'));

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="badge badge-hot">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              Отзывы
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Более 1000 довольных клиентов. Читайте реальные отзывы!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 fade-in" style={{ transitionDelay: '0.1s', opacity: 0 }}>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Все отзывы
          </button>
          <button
            onClick={() => setFilter('ulan-ude')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'ulan-ude'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Улан-Удэ
          </button>
          <button
            onClick={() => setFilter('chita')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filter === 'chita'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            Чита
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card fade-in"
              style={{ transitionDelay: `${(index + 2) * 0.1}s`, opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/50">{testimonial.city}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Text */}
              <p className="text-white/80 leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="text-sm text-white/50 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {testimonial.date}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-indigo-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 15C5.01697 15.5523 5.46468 16 6.01697 16H10.017V12H9.01697C8.46468 12 8.01697 11.5523 8.01697 11V9C8.01697 8.44772 8.46468 8 9.01697 8H13.017V21H6.01697C2.70326 21 -0.0169678 18.3137 -0.0169678 15V5H10.017V12H5.01697V15Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 fade-in" style={{ transitionDelay: '0.8s', opacity: 0 }}>
          {[
            { icon: '⭐', label: '4.9 рейтинг' },
            { icon: '🛡️', label: '100% безопасно' },
            { icon: '⚡', label: 'Быстро' },
            { icon: '💬', label: '1000+ отзывов' },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 glass rounded-full"
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-white/90 font-semibold">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
