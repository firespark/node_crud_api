import { IncomingMessage } from 'http';
import { User } from './data.ts';

interface CustomIncomingMessage extends IncomingMessage {
    body?: { username?: string; age?: number; hobbies?: string[] };
    users?: User[];
    query?: URL;
}
export { CustomIncomingMessage };