import { getUrlSegments } from '../helpers.js';

const putRequest = (request, response) => {
    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {

        case "users":
            const id = urlSegments[1];

            const { username, age, hobbies } = request.body;


            if (
                (username !== undefined && typeof username !== 'string') ||
                (age !== undefined && typeof age !== 'number') ||
                (hobbies !== undefined && (!Array.isArray(hobbies) || !hobbies.every(hobby => typeof hobby === 'string')))
            ) {

                response.statusCode = 400;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify({
                    error: "Invalid request body. Expected format: { username: string, age: number, hobbies: string[] }"
                }));
                response.end();
                return;
            }

            const existingUser = request.users.find(id);

            if (!existingUser) {
                response.statusCode = 404;
                response.write(`User with ID ${id} not found`);
                response.end();
                return;
            }
            const updatedUser = {
                ...existingUser,
                username: username !== undefined ? username : existingUser.username,
                age: age !== undefined ? age : existingUser.age,
                hobbies: hobbies !== undefined ? hobbies : existingUser.hobbies
            };

            request.users[id] = updatedUser;

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(updatedUser));
            response.end();
            break;

        default:
            response.statusCode = 400;
            response.write(`CANNOT PUT ${request.url}`);
            response.end();
            break;

    }
}

export { putRequest };
