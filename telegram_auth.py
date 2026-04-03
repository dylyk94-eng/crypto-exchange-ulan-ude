"""
Скрипт для подключения к Telegram через Telethon.
Сохраняет сессию для последующего использования.
"""

import os
from telethon import TelegramClient
from telethon.sessions import StringSession

# Загружаем переменные из .env файла
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), 'telegram.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ.setdefault(key.strip(), value.strip())

load_env()

# Конфигурация
API_ID = int(os.getenv('TELEGRAM_API_ID', '0'))
API_HASH = os.getenv('TELEGRAM_API_HASH', '')
SESSION_NAME = 'openclaw_session'

async def main():
    print("🔐 Подключение к Telegram...")
    
    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    
    try:
        await client.start()
        
        if await client.is_user_authorized():
            me = await client.get_me()
            print(f"✅ Успешно авторизован как: {me.first_name} (@{me.username})")
            print(f"📱 Номер телефона: {me.phone}")
            
            # Сохраняем строку сессии для возможного использования
            session_string = StringSession.save(client.session)
            print(f"\n📋 Строка сессии (сохраните в безопасном месте):")
            print(session_string)
            
        else:
            print("❌ Авторизация не удалась")
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")
    finally:
        await client.disconnect()
        print("\n🔌 Отключено.")

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
