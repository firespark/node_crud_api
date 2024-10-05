import { getRequest } from '../actions/get';
import { User } from '../models/User'; // Импортируем класс User

describe('getRequest', () => {
    let request: any; // Типизируем как any, так как мы добавляем кастомные поля
    let response: any;

    beforeEach(() => {
        // Инициализируем массив пользователей (экземпляры класса User)
        const users: User[] = [
            new User('John Doe', 30, ['reading']),
            new User('Jane Doe', 25, ['writing'])
        ];
        users[0].id = '1'; // Присваиваем ID вручную для тестов
        users[1].id = '2';

        request = {
            url: '',
            users
        };

        response = {
            statusCode: null,
            headers: {},
            body: '',
            setHeader: jest.fn((header, value) => {
                response.headers[header] = value;
            }),
            write: jest.fn((chunk) => {
                response.body += chunk;
            }),
            end: jest.fn(() => { })
        };
    });

    it('should return a user by ID', () => {
        request.url = '/users/1';

        getRequest(request, response);

        expect(response.statusCode).toBe(200);
        expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(response.body).toBe(JSON.stringify(request.users[0]));
        expect(response.end).toHaveBeenCalled();
    });

    it('should return all users if no ID is provided', () => {
        request.url = '/users';

        getRequest(request, response);

        expect(response.statusCode).toBe(200);
        expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(response.body).toBe(JSON.stringify(request.users));
        expect(response.end).toHaveBeenCalled();
    });

    it('should return 400 if user not found', () => {
        request.url = '/users/999';

        getRequest(request, response);

        expect(response.statusCode).toBe(400);
        expect(response.body).toBe('User with ID 999 not found');
        expect(response.end).toHaveBeenCalled();
    });
});
