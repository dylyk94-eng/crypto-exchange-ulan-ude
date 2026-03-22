import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { city, name, phone, telegram, currency, amount, message } = body;

    // Валидация
    if (!name || !phone || !amount) {
      return NextResponse.json(
        { error: 'Заполните обязательные поля' },
        { status: 400 }
      );
    }

    // Формирование сообщения для Telegram
    const telegramMessage = `
🚀 *Новая заявка с сайта*

📍 *Город:* ${city}
👤 *Имя:* ${name}
📱 *Телефон:* ${phone}
✈️ *Telegram:* ${telegram || 'Не указан'}
💱 *Валюта:* ${currency}
💰 *Сумма:* ${amount}
📝 *Комментарий:* ${message || 'Нет'}
    `.trim();

    // Отправка в Telegram (замените на реальные значения)
    const botToken = process.env.TELEGRAM_BOT_TOKEN || 'DEMO_BOT_TOKEN';
    const chatId = process.env.TELEGRAM_CHAT_ID || '123456789';

    if (botToken !== 'DEMO_BOT_TOKEN' && chatId !== '123456789') {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'Markdown',
          disable_web_page_preview: true,
        }),
      });
    }

    // Логирование в файл (для разработки)
    const logEntry = {
      timestamp: new Date().toISOString(),
      city,
      name,
      phone,
      telegram,
      currency,
      amount,
      message,
    };

    console.log('Lead submitted:', logEntry);

    return NextResponse.json({
      success: true,
      demo: botToken === 'DEMO_BOT_TOKEN',
    });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки' },
      { status: 500 }
    );
  }
}
