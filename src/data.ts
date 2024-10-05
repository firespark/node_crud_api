import { v4 as uuidv4 } from 'uuid';

// Определяем интерфейс для пользователя
interface IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}

// Класс для работы с пользователями
class User implements IUser {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor(username: string, age: number, hobbies: string[]) {
        this.id = uuidv4(); // Генерация уникального идентификатора
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
}

// Пример данных
const data: User[] = [
];

export { User, data };