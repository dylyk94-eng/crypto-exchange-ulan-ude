'use client';

import { useRef, useState } from 'react';

interface FormData {
  direction: string;
  name: string;
  phone: string;
  telegram: string;
  currency: string;
  amount: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  amount?: string;
}

const offices = [
  {
    city: 'Улан-Удэ',
    address: 'ул. Балтахинова, 17',
    schedule: 'Ежедневно, 12:00-18:00',
    details: 'Подходит для стандартных обменов и личной консультации.',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    direction: 'sell',
    name: '',
    phone: '',
    telegram: '',
    currency: '',
    amount: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Укажите имя длиной не меньше 2 символов.';
    }

    if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Укажите телефон в корректном формате.';
    }

    if (!formData.amount.trim()) {
      nextErrors.amount = 'Добавьте сумму или ориентир по сделке.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      const firstInvalidField = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement | null;
      firstInvalidField?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Отправляем на API (будет работать на Vercel)
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          direction: formData.direction,
          name: formData.name,
          phone: formData.phone,
          telegram: formData.telegram,
          currency: formData.currency,
          amount: formData.amount,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccessModal(true);
        setOrderDetails(formData);
        formRef.current?.reset();
        setFormData({
          direction: 'sell',
          name: '',
          phone: '',
          telegram: '',
          currency: '',
          amount: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      window.setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && orderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Заявка отправлена!
              </h3>
              <p className="text-gray-600 mb-6">
                Менеджер свяжется с вами в ближайшее время
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Детали заявки:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Имя:</span>
                    <span className="font-medium">{orderDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Телефон:</span>
                    <span className="font-medium">{orderDetails.phone}</span>
                  </div>
                  {orderDetails.telegram && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Telegram:</span>
                      <span className="font-medium">{orderDetails.telegram}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Валюта:</span>
                    <span className="font-medium">{orderDetails.currency || 'Не указана'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Сумма:</span>
                    <span className="font-medium text-green-600">{orderDetails.amount}</span>
                  </div>
                  {orderDetails.message && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Комментарий:</span>
                      <span className="font-medium">{orderDetails.message}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Закрыть
                </button>
                <a
                  href="https://t.me/Crypto_u_u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <section id="contact" className="section-shell" tabIndex={-1}>
        <div className="section-inner">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Оставить заявку
            </div>
            <h2 className="max-w-3xl fluid-heading font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-4xl lg:text-5xl">
              Готовы обменять? Напишите нам
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Укажите валюту и сумму — менеджер свяжется с вами, подтвердит курс и назначит время встречи.
            </p>
          </div>

          <div className="surface-grid lg:grid-cols-2 gap-6">
            <article className="surface-strong reveal" style={{ transitionDelay: '0s' }}>
              <h3 className="text-lg font-semibold mb-4">Наш офис</h3>

              {offices.map((office, index) => (
                <div key={index} className="space-y-4">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)] mb-1">
                      {office.city}
                    </div>
                    <p className="text-base text-[rgba(31,26,20,0.95)]">{office.address}</p>
                    <p className="text-sm text-muted">{office.schedule}</p>
                  </div>
                  <p className="text-sm text-[rgba(31,26,20,0.95)]">{office.details}</p>
                </div>
              ))}
            </article>

            <div id="lead-form" className="surface-strong reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="mb-6">
                <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                  Заявка
                </div>
                
                {submitStatus === 'success' && (
                  <div className="mb-4 rounded-2xl border border-[rgba(47,133,90,0.22)] bg-[rgba(47,133,90,0.08)] p-3 text-sm text-[rgba(31,26,20,0.82)]">
                    ✅ Заявка отправлена. Мы свяжемся с вами в ближайшее время.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-4 rounded-2xl border border-[rgba(185,28,28,0.18)] bg-[rgba(185,28,28,0.08)] p-3 text-sm text-[rgba(31,26,20,0.82)]">
                    ❌ Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами в Telegram.
                  </div>
                )}

                <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={errors.name ? 'true' : undefined}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Иван Иванов"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Телефон <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={errors.phone ? 'true' : undefined}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="+7 (999) 999-99-99"
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="telegram" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Telegram (необязательно)
                    </label>
                    <input
                      type="text"
                      id="telegram"
                      name="telegram"
                      value={formData.telegram}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="@username"
                    />
                  </div>

                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Валюта
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Выберите валюту</option>
                      <option value="USDT">USDT</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Сумма или ориентир по сделке <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={errors.amount ? 'true' : undefined}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Пример: 10000"
                    />
                    {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[rgba(31,26,20,0.95)] mb-1">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows={3}
                      className="w-full px-4 py-2 border border-[rgba(17,94,89,0.2)] rounded-lg bg-white focus:ring-2 focus:ring-[rgba(17,94,89,0.3)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Коротко опишите задачу..."
                    />
                  </div>

                  <p className="text-xs leading-5 text-[rgba(31,26,20,0.82)]">
                    Отправляя форму, вы соглашаетесь с{' '}
                    <a href="/privacy" className="underline hover:text-[rgba(17,94,89,1)]">политикой конфиденциальности</a>.
                  </p>
                  <button type="submit" className="btn-primary min-w-[12rem]" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
