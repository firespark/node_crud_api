import * as http from 'http';
import "dotenv/config";

import { getRequest } from './actions/get.js';
import { postRequest } from './actions/post.js';
import { putRequest } from './actions/put.js';
import { deleteRequest } from './actions/delete.js';
import { getBody } from './helpers.js';
import data from "./data.js";

const PORT = process.env.PORT;

const server = http.createServer();

server.on("request", (request, response) => {

    request.users = data;
    request.query = new URL(request.url, `http://${request.headers.host}`);

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
            response.statusCode = 400;
            response.write("No Response");
            response.end();
    }
})


server.listen(PORT, err => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`);
})