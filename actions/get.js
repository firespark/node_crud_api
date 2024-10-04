import { getUrlSegments, show404 } from '../helpers.js';

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
                    response.statusCode = 400;
                    response.write(`User with ID ${id} not found`);
                    response.end();
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
            show404(response, request.url);
            
            break;
    }
}


export { getRequest };
