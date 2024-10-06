import * as http from 'http';
import "dotenv/config";

import { getRequest } from './actions/get.ts';
import { postRequest } from './actions/post.ts';
import { putRequest } from './actions/put.ts';
import { deleteRequest } from './actions/delete.ts';
import { getBody, showError } from './helpers.ts';
import { data } from "./data.ts";

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    try {
        (request as any).users = data;
        (request as any).query = new URL(request.url || '', `http://${request.headers.host}`);

        switch (request.method) {
            case "GET":
                getBody(request, response, getRequest);
                break;

            case "POST":
                getBody(request, response, postRequest);
                break;

            case "PUT":
                getBody(request, response, putRequest);
                break;

            case "DELETE":
                getBody(request, response, deleteRequest);
                break;

            default:
                showError(response, 400, 'No response');
        }
    } catch (error) {
        const errMessage = NODE_ENV === 'development' ? `An error occurred: ${error}` : 'Some errors occurred';
        showError(response, 500, errMessage);
    }
});

server.listen(PORT, (err?: Error) => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`);
});
