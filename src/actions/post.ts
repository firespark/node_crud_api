import { IncomingMessage, ServerResponse } from 'http';
import { getUrlSegments, showError } from '../helpers.ts';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../data.ts';
import { CustomIncomingMessage } from '../types.ts';

const postRequest = (request: CustomIncomingMessage, response: ServerResponse): void => {
    const urlSegments: string[] = getUrlSegments(request.url || '');

    switch (urlSegments[0]) {
        case "users": {
            if (!request.body) {
                showError(response, 400, "Request body is missing");
                return;
            }

            const { username, age, hobbies } = request.body;

            if (
                typeof username === 'string' &&
                typeof age === 'number' &&
                Array.isArray(hobbies) &&
                hobbies.every(hobby => typeof hobby === 'string')
            ) {

                const newUser = new User(username, age, hobbies);

                if (!request.users) {
                    showError(response, 500, "Users data is missing");
                    return;
                }

                request.users.push(newUser);

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
