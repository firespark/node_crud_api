import { getUrlSegments, showError } from '../helpers.js';

const deleteRequest = (request, response) => {
    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            const id = urlSegments[1];
            const existingUser = request.users.find(id);

            if (!existingUser) {
                showError(response, 400, `User with ID ${id} not found`);
                return;
            }
            response.statusCode = 204;
            response.setHeader("Content-Type", "application/json");
            request.users.splice(id, 1);
            response.write(JSON.stringify(request.users));
            response.end();
            break;

        default:
            showError(response, 404, `Cannot find ${request.url}`);
            break;
    }
}


export { deleteRequest };