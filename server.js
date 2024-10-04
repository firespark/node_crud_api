import * as http from 'http';
import { getRequest } from './actions/get.js';
import { postRequest } from './actions/post.js';
import { putRequest } from './actions/put.js';
import { deleteRequest } from './actions/delete.js';
import { getBody } from './helpers.js';
import data from "./data.js";

const PORT = process.env.PORT || 4000

const server = http.createServer()

server.on("request", (request, response) => {

    request.users = data;
    request.query = new URL(request.url, `http://${request.headers.host}`);

    switch (request.method) {
        case "GET":
            getBody(request, response, get);
            break;

        case "POST":
            getBody(request, response, post);
            break;

        case "PUT":
            getBody(request, response, put);
            break;

        case "DELETE":
            getBody(request, response, deleteR);
            break;

        default:
            response.statusCode = 400;
            response.write("No Response");
            response.end();
    }
})


server.listen(PORT, err => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`)
})