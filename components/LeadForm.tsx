'use client';

import { useState } from 'react';

interface LeadFormProps {
  city: string;
  compact?: boolean;
  onSubmit?: (data: Record<string, FormDataEntryValue | null>) => void;
}

export default function LeadForm({ city, compact = false, onSubmit }: LeadFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      city,
      name: formData.get('name'),
      phone: formData.get('phone'),
      telegram: formData.get('telegram'),
      currency: formData.get('currency'),
      amount: formData.get('amount'),
      message: formData.get('message'),
    };

    if (onSubmit) {
      onSubmit(data);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus(result.demo ? 'demo' : 'success');
        event.currentTarget.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Lead submit error:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    window.setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className={`glass-panel relative overflow-hidden ${compact ? 'p-5' : 'p-6'}`}>
      <div className="absolute left-0 top-0 h-1 w-full bg-[linear-gradient(90deg,#115e59_0%,#d97706_100%)]" />

      {submitStatus === 'success' && (
        <div className="mb-4 rounded-2xl border border-[rgba(47,133,90,0.22)] bg-[rgba(47,133,90,0.08)] p-3 text-sm text-[rgba(31,26,20,0.82)]">
          Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      )}
      {submitStatus === 'demo' && (
        <div className="mb-4 rounded-2xl border border-[rgba(217,119,6,0.22)] bg-[rgba(217,119,6,0.08)] p-3 text-sm text-[rgba(31,26,20,0.82)]">
          Уведомления временно не настроены. Для связи напишите нам напрямую в{' '}
          <a
            href="https://t.me/Crypto_u_u"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            Telegram
          </a>
          .
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-4 rounded-2xl border border-[rgba(185,28,28,0.18)] bg-[rgba(185,28,28,0.08)] p-3 text-sm text-[rgba(31,26,20,0.82)]">
          Не удалось отправить заявку. Попробуйте еще раз или напишите нам в Telegram.
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit}>
        <input type="hidden" name="city" value={city} />

        <input
          type="text"
          name="name"
          placeholder="Как к вам обращаться"
          required
          disabled={isSubmitting}
          className="input-base disabled:cursor-not-allowed disabled:opacity-50"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          disabled={isSubmitting}
          className="input-base disabled:cursor-not-allowed disabled:opacity-50"
        />
        <input
          type="text"
          name="telegram"
          placeholder="Telegram, если удобно"
          disabled={isSubmitting}
          className="input-base disabled:cursor-not-allowed disabled:opacity-50"
        />
        <select
          name="currency"
          disabled={isSubmitting}
          className="input-base disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue=""
        >
          <option value="">Выберите валюту</option>
          <option value="USDT">USDT</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="Другое">Другое</option>
        </select>
        <input
          type="text"
          name="amount"
          placeholder="Сумма или ориентир"
          required
          disabled={isSubmitting}
          className="input-base disabled:cursor-not-allowed disabled:opacity-50"
        />
        <textarea
          name="message"
          placeholder="Коротко опишите задачу"
          rows={3}
          disabled={isSubmitting}
          className="input-base resize-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-muted">
        Отправляя форму, вы соглашаетесь с нашей{' '}
        <a href="/privacy" className="underline hover:text-[rgba(17,94,89,0.9)]">
          политикой конфиденциальности
        </a>{' '}
        и на обратную связь по указанным контактам.
      </p>
    </div>
  );
}
