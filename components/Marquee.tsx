'use client';

export default function Marquee() {
  const items = [
    '🔒 100% безопасность',
    '⚡ Обмен за 15 минут',
    '💰 Лучший курс',
    '👨‍💼 Менеджер 24/7',
    '🌍 Международные платежи',
    '✅ 98% довольных клиентов',
    '🏢 Офисы в Улан-Удэ и Чите',
  ];

  return (
    <div className="py-4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-y border-white/5 overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="text-white/80 font-semibold text-sm inline-flex items-center gap-2"
          >
            {item}
            <span className="text-white/30">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
