import { getUrlSegments } from '../helpers.js';

const deleteRequest = (request, response) => {
    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            const id = urlSegments[1];
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            request.users.splice(id, 1);
            response.write(JSON.stringify(request.users));
            response.end();
            break;

        default:
            response.statusCode = 400;
            response.write(`CANNOT DELETE ${request.url}`);
            response.end();
            break;
    }
}


export { deleteRequest };