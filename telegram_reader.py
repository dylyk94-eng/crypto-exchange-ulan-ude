"""
Скрипт для чтения сообщений из Telegram.
Позволяет анализировать чаты, группы и каналы.
"""

import os
import json
from datetime import datetime
from telethon import TelegramClient
from telethon.tl.types import PeerUser, PeerChat, PeerChannel

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

async def get_all_dialogs(client):
    """Получает список всех чатов, групп и каналов."""
    dialogs = []
    
    async for dialog in client.iter_dialogs():
        dialogs.append({
            'id': dialog.id,
            'name': dialog.name,
            'type': 'channel' if dialog.is_channel else 'group' if dialog.is_group else 'user',
            'unread_count': dialog.unread_count,
            'message': dialog.message.text if dialog.message else None,
            'date': dialog.date.isoformat() if dialog.date else None
        })
    
    return dialogs

async def get_messages_from_dialog(client, dialog_id, limit=100):
    """Получает сообщения из конкретного чата."""
    messages = []
    
    try:
        async for message in client.iter_messages(dialog_id, limit=limit):
            if message.text:  # Только текстовые сообщения
                msg_data = {
                    'id': message.id,
                    'date': message.date.isoformat() if message.date else None,
                    'text': message.text,
                    'sender_id': message.sender_id,
                    'reply_to': message.reply_to_msg_id
                }
                messages.append(msg_data)
    except Exception as e:
        print(f"Ошибка при получении сообщений из {dialog_id}: {e}")
    
    return messages

async def export_chats_to_json(client, output_file='telegram_export.json'):
    """Экспортирует последние сообщения из всех чатов в JSON."""
    print("📥 Получаем список чатов...")
    dialogs = await get_all_dialogs(client)
    
    print(f"📊 Найдено {len(dialogs)} чатов/каналов")
    
    export_data = {
        'export_date': datetime.now().isoformat(),
        'total_dialogs': len(dialogs),
        'dialogs': []
    }
    
    for i, dialog in enumerate(dialogs, 1):
        print(f"\r📩 Обработка {i}/{len(dialogs)}: {dialog['name'][:40]}...", end='', flush=True)
        
        dialog_data = dialog.copy()
        
        # Получаем последние 50 сообщений
        messages = await get_messages_from_dialog(client, dialog['id'], limit=50)
        dialog_data['messages'] = messages
        dialog_data['message_count'] = len(messages)
        
        export_data['dialogs'].append(dialog_data)
    
    print(f"\n\n💾 Сохраняем в {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(export_data, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Экспорт завершен! Сохранено {len(export_data['dialogs'])} диалогов.")
    return export_data

async def main():
    """Главная функция для анализа Telegram."""
    print("🔐 Подключение к Telegram...")
    
    client = TelegramClient(SESSION_NAME, API_ID, API_HASH)
    
    try:
        await client.start()
        
        if not await client.is_user_authorized():
            print("❌ Не авторизован. Сначала запустите telegram_auth.py")
            return
        
        me = await client.get_me()
        print(f"✅ Авторизован как: {me.first_name} (@{me.username})\n")
        
        # Меню действий
        print("📋 Доступные действия:")
        print("1. Показать список чатов")
        print("2. Экспортировать все сообщения в JSON")
        print("3. Показать последние сообщения из конкретного чата")
        print("4. Анализ конкретного чата")
        
        choice = input("\nВаш выбор (1-4, или Enter для экспорта): ").strip()
        
        if choice == '1' or choice == '':
            dialogs = await get_all_dialogs(client)
            print(f"\n📊 Всего {len(dialogs)} чатов/каналов:\n")
            
            for d in dialogs[:20]:  # Показываем первые 20
                type_emoji = {'channel': '📢', 'group': '👥', 'user': '👤'}.get(d['type'], '💬')
                unread = f" ({d['unread_count']} непрочитанных)" if d['unread_count'] > 0 else ""
                print(f"  {type_emoji} {d['name'][:50]}{unread}")
        
        elif choice == '2':
            filename = input("Имя файла для сохранения (telegram_export.json): ").strip()
            if not filename:
                filename = 'telegram_export.json'
            await export_chats_to_json(client, filename)
        
        elif choice == '3':
            dialogs = await get_all_dialogs(client)
            print("\nДоступные чаты:")
            for i, d in enumerate(dialogs[:15], 1):
                print(f"{i}. {d['name'][:40]} (ID: {d['id']})")
            
            chat_idx = int(input("\nНомер чата: ")) - 1
            if 0 <= chat_idx < len(dialogs):
                chat_id = dialogs[chat_idx]['id']
                limit = int(input("Количество сообщений (10-100): ") or "20")
                
                messages = await get_messages_from_dialog(client, chat_id, limit)
                print(f"\n📩 Последние {len(messages)} сообщений:\n")
                
                for msg in messages[:10]:
                    date = msg['date'][:16] if msg['date'] else 'Неизвестно'
                    text = msg['text'][:100] if msg['text'] else '[нет текста]'
                    print(f"  [{date}] {text}...")
                    print()
        
        elif choice == '4':
            print("\n🤖 Анализ будет доступен после экспорта.")
            print("Сначала выберите пункт 2 для экспорта данных.")
    
    except Exception as e:
        print(f"\n❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        await client.disconnect()
        print("\n🔌 Отключено от Telegram.")

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())
