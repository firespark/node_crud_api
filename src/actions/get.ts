import { IncomingMessage, ServerResponse } from 'http';
import { getUrlSegments, showError } from '../helpers.ts';
import { User } from '../data';
import { CustomIncomingMessage } from '../types.ts';

const getRequest = (request: CustomIncomingMessage, response: ServerResponse): void => {
    const urlSegments: string[] = getUrlSegments(request.url || '');

    switch (urlSegments[0]) {
        case "users": {
            if (!request.users) {
                showError(response, 500, "Users data is missing");
                return;
            }

            if (urlSegments.length === 2) {
                const id = urlSegments[1];
                const user = request.users.find(user => user.id === id);

                if (user) {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(user));
                    response.end();
                } else {
                    showError(response, 400, `User with ID ${id} not found`);
                }
            } else {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(request.users));
                response.end();
            }
            break;
        }

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
};

export { getRequest };
