import { getUrlSegments, showError } from '../helpers.js';
import { v4 as uuidv4 } from 'uuid';

const postRequest = (request, response) => {

    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            const { username, age, hobbies } = request.body;

            if (
                typeof username === 'string' &&
                typeof age === 'number' &&
                Array.isArray(hobbies) &&
                hobbies.every(hobby => typeof hobby === 'string')
            ) {

                const newUser = {
                    id: uuidv4(), 
                    username,
                    age,
                    hobbies
                };

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

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
}

export { postRequest };
