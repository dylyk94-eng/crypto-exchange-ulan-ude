'use client';

import { useState, useRef } from 'react';

interface FormData {
  name: string;
  phone: string;
  currency: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    currency: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Обязательное поле';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Минимум 2 символа';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Обязательное поле';
    } else if (!/^\+?[\d\s\(\)\-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Формат: +7 XXX XXX XX XX';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement;
      if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          city: 'Улан-Удэ',
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus(result.demo ? 'demo' : 'success');

        if (formRef.current) {
          formRef.current.reset();
          setFormData({
            name: '',
            phone: '',
            currency: '',
          });
        }
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }

    if (submitStatus === 'success' || submitStatus === 'demo') {
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const offices = [
    {
      city: 'Улан-Удэ',
      address: 'ул. Балтахинова 17',
      schedule: '12:00–18:00',
      contact: '@Crypto_u_u',
    },
    {
      city: 'Чита',
      address: 'По заявке',
      schedule: 'По согласованию',
      contact: '@Crypto_u_u',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6">
      {/* Binary Rain */}
      <div className="binary-rain" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-3 h-3 bg-neon-lime rounded-full animate-pulse" />
            <span className="text-neon-cyan text-sm font-bold tracking-wider uppercase">
              Contact Interface
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 glitch-text" data-text="УСТАНОВИТЬ СВЯЗЬ">
            <span className="text-gradient-neon">УСТАНОВИТЬ</span>
            <br />
            СВЯЗЬ
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Оставьте заявку или посетите наш офис для обмена криптовалюты
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Offices */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neon-purple mb-8 flex items-center gap-3 reveal" style={{ opacity: 0, transitionDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-neon-purple/20 border border-neon-purple rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              ОФИСЫ
            </h3>
            {offices.map((office, i) => (
              <div
                key={i}
                className={`card-cyber border-neon-purple/20 reveal`}
                style={{ opacity: 0, transitionDelay: `${(i + 2) * 0.15}s` }}
              >
                <h4 className={`text-2xl font-bold text-${office.city === 'Улан-Удэ' ? 'neon-cyan' : 'neon-pink'} mb-6`}>
                  {office.city}
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-cyan/20 border border-neon-cyan/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-lg text-text-primary">
                      {office.address}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-lime/20 border border-neon-lime/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-neon-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-lg text-text-primary">
                      {office.schedule}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neon-pink/20 border border-neon-pink/30 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a
                      href={`https://t.me/${office.contact.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-neon-cyan hover:text-neon-lime transition-colors font-semibold"
                    >
                      {office.contact}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="reveal" style={{ opacity: 0, transitionDelay: '0.4s' }}>
            <div className="card-cyber border-neon-cyan/20 p-10">
              {/* Glitch Header */}
              <h3 className="text-3xl font-black text-white mb-8 text-center glitch-text" data-text="БЫСТРАЯ ЗАЯВКА">
                <span className="text-gradient-neon">БЫСТРАЯ ЗАЯВКА</span>
              </h3>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mb-8 p-4 bg-neon-lime/10 border border-neon-lime/30 rounded-xl text-neon-lime fade-in flex items-center gap-3" role="alert">
                  <div className="w-10 h-10 bg-neon-lime/20 border border-neon-lime/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-lg">УСПЕХ!</strong> Менеджер свяжется с вами.
                  </div>
                </div>
              )}
              {submitStatus === 'demo' && (
                <div className="mb-8 p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl text-neon-cyan fade-in flex items-center gap-3" role="alert">
                  <div className="w-10 h-10 bg-neon-cyan/20 border border-neon-cyan/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-lg">INFO:</strong> Demo-режим. Заявка записана.
                  </div>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-8 p-4 bg-neon-pink/10 border border-neon-pink/30 rounded-xl text-neon-pink fade-in flex items-center gap-3" role="alert">
                  <div className="w-10 h-10 bg-neon-pink/20 border border-neon-pink/30 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-lg">ОШИБКА:</strong> Попробуйте ещё раз.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" ref={formRef} noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-neon-cyan mb-3 tracking-wider uppercase">
                    ИМЯ <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ИВАН"
                    required
                    disabled={isSubmitting}
                    className={`input-neon w-full ${errors.name ? 'border-neon-pink' : ''}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-neon-pink flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-neon-cyan mb-3 tracking-wider uppercase">
                    ТЕЛЕФОН <span className="text-neon-pink">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 999 999 99 99"
                    required
                    disabled={isSubmitting}
                    className={`input-neon w-full ${errors.phone ? 'border-neon-pink' : ''}`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-2 text-sm text-neon-pink flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <label htmlFor="currency" className="block text-sm font-bold text-neon-cyan mb-3 tracking-wider uppercase">
                    ВАЛЮТА <span className="text-neon-pink">*</span>
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="input-neon w-full"
                  >
                    <option value="">ВЫБЕРИТЕ ВАЛЮТУ</option>
                    <option value="USDT" className="bg-void">USDT</option>
                    <option value="BTC" className="bg-void">BTC</option>
                    <option value="ETH" className="bg-void">ETH</option>
                    <option value="SOL" className="bg-void">SOL</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-neon w-full py-5 text-xl flex items-center justify-center gap-3"
                  aria-live="polite"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      ОТПРАВКА...
                    </>
                  ) : (
                    <>
                      ОТПРАВИТЬ ЗАЯВКУ
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Alternative CTA */}
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-text-secondary mb-6 text-lg">
                  ИЛИ НАПИШИТЕ ПРЯМО В TELEGRAM
                </p>
                <a
                  href="https://t.me/Crypto_u_u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon-secondary w-full py-4 flex items-center justify-center gap-3 text-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.169.325.015.093.034.305.019.471z"/>
                  </svg>
                  ТЕЛЕГРАМ
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .reveal {
          animation: slide 0.8s ease forwards;
        }

        .fade-in {
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
