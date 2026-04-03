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
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Укажите имя длиной не меньше 2 символов.';
    }

    if (!/^\+?[\d\s()-]{10,}$/.test(formData.phone.trim())) {
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
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus(result.demo ? 'demo' : 'success');
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
    <section id="contact" className="section-shell" tabIndex={-1}>
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Оставить заявку
          </div>
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[rgba(31,26,20,0.95)] md:text-5xl">
            Готовы обменять? Напишите нам
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Укажите валюту и сумму — менеджер свяжется с вами, подтвердит курс и назначит время встречи.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="space-y-6">
            <div className="surface reveal">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Канал связи
              </div>
              <h3 className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                Быстрее всего через Telegram
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">
                Напишите — ответим за несколько минут. Сразу обсудим сумму, курс и удобное время.
              </p>
              <a
                href="https://t.me/Crypto_u_u"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-6 py-3 text-white transition hover:bg-[#1A8BCA] font-semibold"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.56 1.17-1.16 1.17-.66 0-1.15-.65-1.15-1.65 0-1.58.9-2.48 1.13-2.48.36 0 .63-.09.63-.35 0-.48-.4-.48-1.1-.52-1.1-.52-.35 0-.66.36-1.07.76-.83 1.06-.83 1.06-1.32 1.06-.84 0-1.39-.68-1.39-1.33 0-2.21 1.35-4.38 2.7-5.6 2.35-1.97 2.68-2.2 2.68-4.28 0-.7-.11-1.07-.45-1.32-.3-.21-.63-.24-.94-.26-1.23-.03-.52.25-1.02.74-1.5.56-.55.92-1.1.92-1.1 1.73 0 2.8 1.08 2.8 2.8 0 .46-.18.84-.54.84-.83 0-.23-.16-.4-.53-.4-1.07-.08-.48-.3-.92-.61-1.29-.07-.25-.05-.48.06-.68.18-.41.43-.5.94-.5 1.47 0 1.09.7 2.02 1.68 2.78 1.55 1.25 2.55 2.87 2.55 4.65 0 .92-.26 1.78-.71 2.5-.38.63-.9 1.05-1.57 1.05-.54 0-.96-.25-1.28-.74-.3-.46-.3-1.2.13-1.75.74-1.04 1.66-1.63 2.63-1.63 1.32 0 2.4 1.1 2.4 2.42 0 .4-.15.8-.46.8-.6 0-.22-.15-.4-.44-.4-.92-.1-.41-.33-.8-.63-1.16-.08-.21-.09-.42.03-.62.2-.49.5-.95.7-1.34.8-1.53 1.03-2.53 1.03-4.03 0-.96-.29-1.85-.78-2.58-.41-.66-.97-1.08-1.67-1.08-.56 0-1 .29-1.27.8-1.72.52-.47.93-.73 1.57-.73 1.43 0 2.32-1.1 2.32-2.75 0-.44-.17-.81-.51-.81-.57 0-.23-.15-.41-.42-.41-.87-.1-.39-.31-.76-.59-1.12-.08-.21-.08-.42.02-.61.19-.48.48-.93.68-1.32.8-1.53 1.04-2.53 1.04-4.03 0-.96-.29-1.85-.78-2.58-.41-.66-.97-1.08-1.67-1.08-.56 0-1 .29-1.27.8-1.72.52-.47.93-.73 1.57-.73z"/>
                </svg>
                Открыть Telegram
              </a>
            </div>

            {offices.map((office, index) => (
              <article
                key={office.city}
                className="surface reveal"
                style={{ transitionDelay: `${0.12 + index * 0.08}s` }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-[rgba(31,26,20,0.95)]">{office.city}</h3>
                  <span className="rounded-full bg-[rgba(15,118,110,0.1)] px-3 py-1 text-sm font-semibold text-[rgba(17,94,89,0.88)]">
                    На связи
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-6 text-[rgba(31,26,20,0.82)]">
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">Адрес</div>
                    <div>{office.address}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">График</div>
                    <div>{office.schedule}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[rgba(106,90,73,0.84)]">Комментарий</div>
                    <div>{office.details}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="surface-strong reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="mb-6">
              <div className="text-sm font-medium uppercase tracking-[0.18em] text-[rgba(17,94,89,0.76)]">
                Заявка
              </div>
              <h3 className="mt-3 text-3xl font-semibold text-[rgba(31,26,20,0.95)]">
                Форма заявки
              </h3>
            </div>

            {submitStatus === 'success' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(47,133,90,0.22)] bg-[rgba(47,133,90,0.1)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Заявка отправлена. Менеджер свяжется с вами в ближайшее время.
              </div>
            )}
            {submitStatus === 'demo' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(217,119,6,0.22)] bg-[rgba(217,119,6,0.1)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Уведомления временно не настроены. Для связи напишите нам напрямую в{' '}
                <a href="https://t.me/Crypto_u_u" target="_blank" rel="noopener noreferrer" className="font-medium underline">Telegram</a>.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="toast-enter mb-5 rounded-2xl border border-[rgba(185,28,28,0.18)] bg-[rgba(185,28,28,0.08)] px-4 py-3 text-sm text-[rgba(31,26,20,0.84)]">
                Не удалось отправить заявку. Попробуйте еще раз или свяжитесь с нами в Telegram.
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-1">
                <label htmlFor="direction" className="field-label">
                  Направление
                </label>
                <select
                  id="direction"
                  name="direction"
                  value={formData.direction}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="sell">Продать крипту за рубли</option>
                  <option value="buy">Купить крипту за рубли</option>
                  <option value="transfer">Международный перевод</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="currency" className="field-label">
                  Валюта
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="input-base"
                >
                  <option value="">Выберите направление</option>
                  <option value="USDT">USDT</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                  <option value="LTC">LTC</option>
                  <option value="TRX">TRX</option>
                  <option value="BNB">BNB</option>
                  <option value="SOL">SOL</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label htmlFor="name" className="field-label">
                  Имя
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Как к вам обращаться"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.name}</p>}
              </div>

              <div className="md:col-span-1">
                <label htmlFor="phone" className="field-label">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="+7 999 999 99 99"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.phone}</p>}
              </div>

              <div className="md:col-span-1">
                <label htmlFor="telegram" className="field-label">
                  Telegram
                </label>
                <input
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="@username"
                />
              </div>

              <div className="md:col-span-1">
                <label htmlFor="amount" className="field-label">
                  Сумма
                </label>
                <input
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Например, 5000 USDT или 300 000 RUB"
                  aria-invalid={Boolean(errors.amount)}
                />
                {errors.amount && <p className="mt-2 text-sm text-[rgba(185,28,28,0.82)]">{errors.amount}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="field-label">
                  Комментарий <span className="font-normal text-muted">(необязательно)</span>
                </label>
                <input
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Удобное время или дополнительные детали"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-muted">
                  Отправляя форму, вы соглашаетесь с{' '}
                  <a href="/privacy" className="underline hover:text-[rgba(17,94,89,1)]">политикой конфиденциальности</a>.
                </p>
                <button type="submit" className="btn-primary min-w-[12rem]" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
