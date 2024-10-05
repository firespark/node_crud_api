import { IncomingMessage, ServerResponse } from 'http';
import { getUrlSegments, showError } from '../helpers.ts';
import { User } from '../data.ts';  // Импортируем класс User
import { CustomIncomingMessage } from '../types.ts';


const putRequest = (request: CustomIncomingMessage, response: ServerResponse): void => {
    const urlSegments = getUrlSegments(request.url || '');

    switch (urlSegments[0]) {
        case "users": {
            const id = urlSegments[1];

            const { username, age, hobbies } = request.body || {};

            // Проверка данных тела запроса
            if (
                (username !== undefined && typeof username !== 'string') ||
                (age !== undefined && typeof age !== 'number') ||
                (hobbies !== undefined && (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')))
            ) {
                showError(response, 400, "Invalid request body. Expected format: { username: string, age: number, hobbies: string[] }");
                return;
            }

            // Проверяем наличие пользователей
            if (!request.users) {
                showError(response, 500, "Users data is missing");
                return;
            }

            // Ищем пользователя по ID
            const existingUser = request.users.find(user => user.id === id);

            if (!existingUser) {
                showError(response, 400, `User with ID ${id} not found`);
                return;
            }

            // Обновляем данные пользователя
            const updatedUser = new User(
                username !== undefined ? username : existingUser.username,
                age !== undefined ? age : existingUser.age,
                hobbies !== undefined ? hobbies : existingUser.hobbies
            );

            updatedUser.id = existingUser.id; // Сохраняем старый ID

            const userIndex = request.users.findIndex(user => user.id === id);
            request.users[userIndex] = updatedUser;

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(updatedUser));
            response.end();
            break;
        }

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
};

export { putRequest };