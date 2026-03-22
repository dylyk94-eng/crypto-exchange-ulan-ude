'use client';

import { useState } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Оставьте заявку',
      description: 'Заполните форму на сайте или напишите нам в Telegram. Укажите сумму и валюту для обмена.',
      icon: '📝',
    },
    {
      number: '02',
      title: 'Связь с менеджером',
      description: 'Наш менеджер свяжется с вами в течение 15 минут. Подтвердит детали и согласует курс.',
      icon: '📞',
    },
    {
      number: '03',
      title: 'Проведение обмена',
      description: 'Встречаемся в офисе или проводим онлайн-обмен. Фиксируем курс и обмениваем криптовалюту.',
      icon: '💱',
    },
    {
      number: '04',
      title: 'Получение средств',
      description: 'Получите рубли на карту или наличными.整个过程 занимает не более 15 минут!',
      icon: '✅',
    },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="badge">Просто</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Как <span className="gradient-text">работает</span> обмен
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Весь процесс занимает не более 15 минут. 4 простых шага — и крипта ваша!
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block" />

          <div className="grid md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative fade-in ${activeStep === index ? 'active' : ''}`}
                style={{ transitionDelay: `${index * 0.15}s`, opacity: 0 }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step Number Card */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? '-right-6' : '-left-6'
                  } w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg md:block hidden`}
                >
                  <span className="text-white font-bold">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`glass p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 ${activeStep === index ? 'border-indigo-500/50' : ''} md:ml-0 ml-12`}>
                  {/* Icon */}
                  <div className={`text-6xl mb-6 ${activeStep === index ? 'scale-110' : ''} transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center fade-in" style={{ transitionDelay: '0.6s', opacity: 0 }}>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            Начать сейчас
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
