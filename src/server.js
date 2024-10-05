import * as http from 'http';
import "dotenv/config";

import { getRequest } from './actions/get.js';
import { postRequest } from './actions/post.js';
import { putRequest } from './actions/put.js';
import { deleteRequest } from './actions/delete.js';
import { getBody, showError } from './helpers.js';
import data from "./data.js";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

console.log(NODE_ENV)

const server = http.createServer();

server.on("request", (request, response) => {

    request.users = data;
    request.query = new URL(request.url, `http://${request.headers.host}`);

    try {


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
    }
    catch (error) {
        const errMessage = (NODE_ENV === 'development') ? `An error occured: ${error}` : 'Some errors occured';
        showError(response, 500, `An error occured: ${error}`);
    }

})


server.listen(PORT, err => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`);
})