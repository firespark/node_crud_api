import { IncomingMessage } from 'http';
import { User } from './data.ts';

interface CustomIncomingMessage extends IncomingMessage {
    body?: { username?: string; age?: number; hobbies?: string[] }; // Ожидаемое тело запроса
    users?: User[]; // Список пользователей теперь необязательный
    query?: URL; // Добавляем query, если используешь его
}
export { CustomIncomingMessage };