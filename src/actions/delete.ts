import { IncomingMessage, ServerResponse } from 'http';
import { getUrlSegments, showError } from '../helpers.ts';
import { CustomIncomingMessage } from '../types.ts'; // Импортируем наш расширенный тип

const deleteRequest = (request: CustomIncomingMessage, response: ServerResponse): void => {
    const urlSegments: string[] = getUrlSegments(request.url || '');

    switch (urlSegments[0]) {
        case "users": {
            if (!request.users) {
                showError(response, 500, "Users data is missing");
                return;
            }

            const id = urlSegments[1];
            const userIndex = request.users.findIndex(user => user.id === id);

            if (userIndex === -1) {
                showError(response, 400, `User with ID ${id} not found`);
                return;
            }

            // Удаляем пользователя по индексу
            request.users.splice(userIndex, 1);

            // Отправляем ответ с кодом 204 (No Content)
            response.statusCode = 204;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(request.users));
            response.end();
            break;
        }

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
};

export { deleteRequest };

