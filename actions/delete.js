import { getUrlSegments, show404 } from '../helpers.js';

const deleteRequest = (request, response) => {
    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            const id = urlSegments[1];
            const existingUser = request.users.find(id);

            if (!existingUser) {
                response.statusCode = 400;
                response.write(`User with ID ${id} not found`);
                response.end();
                return;
            }
            response.statusCode = 204;
            response.setHeader("Content-Type", "application/json");
            request.users.splice(id, 1);
            response.write(JSON.stringify(request.users));
            response.end();
            break;

        default:
            show404(response, request.url);
            break;
    }
}


export { deleteRequest };