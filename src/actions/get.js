import { getUrlSegments, showError } from '../helpers.js';

const getRequest = (request, response) => {

    const urlSegments = getUrlSegments(request.url);

    switch (urlSegments[0]) {
        case "users":
            if (urlSegments.length === 2) {
                const id = urlSegments[1];
                if (request.users[id]) {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json");
                    response.write(JSON.stringify(request.users[id]));
                    response.end();
                } else {
                    showError(response, 400, `User with ID ${id} not found`);
                }
            } 
            else {
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.write(JSON.stringify(request.users));
                response.end();
            }
            break;
    
        default:
            showError(response, 404, `Cannot find ${request.url}`);

            break;
    }
}


export { getRequest };
