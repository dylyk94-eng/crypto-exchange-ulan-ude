'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Как быстро проходит обмен?',
      answer: 'Обмен криптовалюты занимает не более 15 минут. Это включает в себя связь с менеджером, подтверждение деталей и проведение транзакции. Офисные обмены проходят быстрее — обычно за 5-10 минут.',
      icon: '⏱️',
    },
    {
      question: 'Какие криптовалюты вы принимаете?',
      answer: 'Мы принимаем самые популярные криптовалюты: Bitcoin (BTC), Ethereum (ETH), Tether (USDT) и другие. Если вам нужна другая криптовалюта — напишите нам в Telegram, мы обсудим варианты.',
      icon: '💰',
    },
    {
      question: 'Есть ли комиссия за обмен?',
      answer: 'Мы работаем с прозрачным ценообразованием. Наш комиссия уже включена в курс обмена. Никаких скрытых или дополнительных комиссий нет. Вы сразу видите итоговую сумму в рублях.',
      icon: '💳',
    },
    {
      question: 'Как можно оплатить криптовалюту?',
      answer: 'Принимаем оплату наличными в офисах, банковским переводом на карту, а также криптовалютой с вашего кошелька. Для крупных сумм возможны индивидуальные условия.',
      icon: '🏦',
    },
    {
      question: 'Можно ли обменять крупную сумму?',
      answer: 'Да, мы работаем с крупными суммами. Для обменов от 100 000 ₽ рекомендуем предварительно связаться с менеджером — мы подготовим документы и согласуем курс.',
      icon: '📊',
    },
    {
      question: 'Как вы гарантируете безопасность?',
      answer: 'Мы используем современные методы защиты данных и транзакций. Все операции проходят через защищённые каналы связи. У нас есть офисы в Улан-Удэ и Чите, где можно провести обмен лично.',
      icon: '🔒',
    },
    {
      question: 'Можно ли получить помощь в офисе?',
      answer: 'Конечно! Наши офисы открыты ежедневно с 12:00 до 18:00. Менеджеры помогут вам с любыми вопросами, проведут обмен и объяснят, как пользоваться криптовалютой.',
      icon: '🏢',
    },
    {
      question: 'Что делать, если возникли проблемы с обменом?',
      answer: 'Свяжитесь с нами через Telegram или по телефону. Мы всегда готовы помочь решить любые вопросы. Обычно проблемы решаются в течение нескольких минут.',
      icon: '🆘',
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="badge">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-xl text-white/70">
            Ответы на популярные вопросы о криптообмене
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden fade-in"
              style={{ transitionDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{faq.icon}</span>
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-indigo-500/20 rotate-180'
                    : 'bg-white/5'
                }`}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0">
                  <p className="text-white/80 leading-relaxed pl-14">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center fade-in" style={{ transitionDelay: '0.9s', opacity: 0 }}>
          <p className="text-white/70 mb-6">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
          >
            Спросить менеджера
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
