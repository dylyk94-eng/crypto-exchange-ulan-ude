'use client';

import { useState } from 'react';

interface LeadFormProps {
  city: string;
  compact?: boolean;
  onSubmit?: (data: any) => void;
}

export default function LeadForm({ city, compact = false, onSubmit }: LeadFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'demo' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
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
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus(result.demo ? 'demo' : 'success');
        e.currentTarget.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className="glass-panel rounded-lg p-3.5 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#d49123] via-[#f0cd75] to-[#d49123]" />

      {submitStatus === 'success' && (
        <div className="mb-4 p-3 bg-[rgba(59,102,67,0.25)] border border-[rgba(124,207,138,0.4)] text-[#dff3e3] rounded-lg text-sm leading-[1.4] animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-[#79c887]">✓</span>
            <span>Заявка отправлена. Менеджер свяжется с вами.</span>
          </div>
        </div>
      )}
      {submitStatus === 'demo' && (
        <div className="mb-4 p-3 bg-[rgba(212,145,35,0.2)] border border-[rgba(240,205,117,0.4)] text-[#f7e8ca] rounded-lg text-sm leading-[1.4] animate-fade-in">
          <div className="flex items-center gap-2">
            <span>ℹ️</span>
            <span>Сейчас включён demo-режим. Заявка записана в консоль.</span>
          </div>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-4 p-3 bg-[rgba(112,47,47,0.25)] border border-[rgba(235,121,121,0.34)] text-[#fde1e1] rounded-lg text-sm leading-[1.4] animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-[#eb7979]">✕</span>
            <span>Не удалось отправить заявку. Попробуйте ещё раз.</span>
          </div>
        </div>
      )}

      <form className="space-y-2.5" onSubmit={handleSubmit}>
        <input type="hidden" name="city" value={city} />

        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 placeholder-[#8a92a0] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          required
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 placeholder-[#8a92a0] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <input
          type="text"
          name="telegram"
          placeholder="Telegram (необязательно)"
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 placeholder-[#8a92a0] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <select
          name="currency"
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" className="bg-[#10192c]">Выберите валюту</option>
          <option value="USDT" className="bg-[#10192c]">USDT</option>
          <option value="BTC" className="bg-[#10192c]">BTC</option>
          <option value="ETH" className="bg-[#10192c]">ETH</option>
          <option value="Другое" className="bg-[#10192c]">Другое</option>
        </select>
        <input
          type="text"
          name="amount"
          placeholder="Сумма в рублях"
          required
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 placeholder-[#8a92a0] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <textarea
          name="message"
          placeholder="Комментарий (необязательно)"
          rows={3}
          disabled={isSubmitting}
          className="w-full px-3.5 py-3 border border-[rgba(169,182,219,0.28)] bg-gradient-to-b from-[rgba(34,48,76,0.7)] to-[rgba(25,33,56,0.78)] text-[#f3ebdc] rounded-lg outline-none input-focus transition-all duration-200 resize-none placeholder-[#8a92a0] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-3.5 btn-gold text-[#2d2006] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>

      <p className="text-[10px] text-[#d2c6ae] mt-3 text-center opacity-60">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </div>
  );
}
