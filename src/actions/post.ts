import { IncomingMessage, ServerResponse } from 'http';
import { getUrlSegments, showError } from '../helpers.ts';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../data.ts';
import { CustomIncomingMessage } from '../types.ts'; // Импортируем наш расширенный тип

const postRequest = (request: CustomIncomingMessage, response: ServerResponse): void => {
    const urlSegments: string[] = getUrlSegments(request.url || '');

    switch (urlSegments[0]) {
        case "users": {
            if (!request.body) {
                showError(response, 400, "Request body is missing");
                return;
            }

            const { username, age, hobbies } = request.body;

            // Проверка данных тела запроса
            if (
                typeof username === 'string' &&
                typeof age === 'number' &&
                Array.isArray(hobbies) &&
                hobbies.every(hobby => typeof hobby === 'string')
            ) {
                // Создаем нового пользователя
                const newUser = new User(username, age, hobbies);

                // Проверяем наличие массива пользователей
                if (!request.users) {
                    showError(response, 500, "Users data is missing");
                    return;
                }

                // Добавляем нового пользователя в массив
                request.users.push(newUser);

                // Отправляем ответ с обновленным списком пользователей
                response.statusCode = 201;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(request.users));
                response.end();
            }
            else {
                showError(response, 400, "Invalid request body. Expected format: { username: string, age: number, hobbies: string[] }");
            }
            break;
        }

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
};

export { postRequest };
