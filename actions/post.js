import { getUrlSegments } from '../helpers.js';

const postRequest = (request, response) => {

    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            request.posts.push(request.body);
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(request.posts));
            response.end();
            break;

        default:
            response.statusCode = 400;
            response.write(`CANNOT POST ${request.url}`);
            response.end();
    }
}


export { postRequest };