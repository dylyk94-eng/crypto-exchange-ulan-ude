/**
 * Escapes special characters for Telegram Bot API messages with HTML parse_mode
 * Prevents issues when user input contains characters that could be interpreted
 * as HTML formatting
 */
export function escapeHtmlText(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * @deprecated Use escapeHtmlText instead
 * Kept for backward compatibility
 */
export function escapeTelegramText(text: string): string {
  return escapeHtmlText(text);
}

/**
 * Safely formats a Telegram message with escaped user input
 * @deprecated Use direct message formatting instead
 */
export function formatTelegramMessage(parts: Record<string, string>): string {
  return Object.entries(parts)
    .map(([key, value]) => `${key}: ${escapeHtmlText(value)}`)
    .join('\n');
}
