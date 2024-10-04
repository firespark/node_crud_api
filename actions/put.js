import { getUrlSegments } from '../helpers.js';

const putRequest = (request, response) => {
    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {

        case "users":
            const id = urlSegments[1];
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            request.users[id] = request.body;
            response.write(JSON.stringify(request.users[id]));
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