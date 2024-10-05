import { getUrlSegments, showError } from '../helpers.js';

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

                //response.setHeader("Content-Type", "application/json");
                showError(response, 400, "Invalid request body. Expected format: { username: string, age: number, hobbies: string[] }");
                return;
            }

            const existingUser = request.users.find(id);

            if (!existingUser) {
                showError(response, 400, `User with ID ${id} not found`);
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
            showError(response, 404, `Cannot find ${request.url}`);
            break;

    }
}

export { putRequest };
