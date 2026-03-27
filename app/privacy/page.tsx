import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Криптообмен',
  description: 'Политика обработки персональных данных в соответствии с 152-ФЗ.',
};

export default function PrivacyPage() {
  const updatedDate = '27 марта 2026 г.';

  return (
    <div className="min-h-screen bg-[#f6f1e8]">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(17,94,89,0.82)] hover:underline"
        >
          ← На главную
        </Link>

        <h1 className="mt-8 text-3xl font-semibold text-[rgba(31,26,20,0.95)] md:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-3 text-sm text-[rgba(106,90,73,0.7)]">Последнее обновление: {updatedDate}</p>

        <div className="mt-10 space-y-8 text-base leading-8 text-[rgba(31,26,20,0.82)]">
          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">1. Общие положения</h2>
            <p className="mt-3">
              Настоящая политика определяет порядок обработки и защиты персональных данных
              пользователей сайта (далее — Сайт), передаваемых через формы обратной связи.
              Обработка персональных данных осуществляется в соответствии с Федеральным законом
              от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">2. Какие данные мы собираем</h2>
            <p className="mt-3">При заполнении формы заявки мы собираем следующие данные:</p>
            <ul className="mt-3 list-inside list-disc space-y-1">
              <li>Имя (для обращения)</li>
              <li>Номер телефона</li>
              <li>Никнейм в Telegram (опционально)</li>
              <li>Предпочитаемая валюта и ориентировочная сумма</li>
              <li>Комментарий к заявке (опционально)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">3. Цели обработки данных</h2>
            <p className="mt-3">
              Персональные данные обрабатываются исключительно для обратной связи с пользователем
              и согласования условий обмена криптовалюты. Данные не передаются третьим лицам,
              не продаются и не используются в маркетинговых целях.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">4. Хранение данных</h2>
            <p className="mt-3">
              Данные, переданные через форму, поступают в мессенджер Telegram и хранятся только
              там. Мы не ведём собственной базы данных клиентов. Срок хранения — до завершения
              переговоров и проведения сделки.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">5. Права пользователя</h2>
            <p className="mt-3">
              Вы вправе в любое время потребовать уточнения, блокировки или уничтожения своих
              персональных данных. Для этого напишите нам в Telegram:&nbsp;
              <a
                href="https://t.me/Crypto_u_u"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[rgba(17,94,89,0.88)] hover:underline"
              >
                @Crypto_u_u
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">6. Cookies</h2>
            <p className="mt-3">
              Сайт использует localStorage для сохранения выбранной темы оформления (светлая/тёмная).
              Никаких аналитических или рекламных cookies не устанавливается.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[rgba(31,26,20,0.95)]">7. Изменения политики</h2>
            <p className="mt-3">
              Мы оставляем за собой право вносить изменения в настоящую политику. Актуальная версия
              всегда доступна по адресу <code className="rounded bg-[rgba(15,118,110,0.08)] px-1">/privacy</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
