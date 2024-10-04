import * as http from 'http';
import { getRequest } from './actions/get.js';
import { postRequest } from './actions/post.js';
import { putRequest } from './actions/put.js';
import { deleteRequest } from './actions/delete.js';
import { data } from '.data.js';

const PORT = process.env.PORT || 4000

const server = http.createServer()

server.on("request", (request, response) => {

    request.users = data;

    switch (request.method) {
        case "GET":
            getRequest(request, response)
            break

        case "POST":
            postRequest(request, response)
            break

        case "PUT":
            putRequest(request, response)
            break

        case "DELETE":
            deleteRequest(request, response)
            break

        default:
            response.statusCode = 400
            response.write("No Response")
            response.end()
    }
})


server.listen(PORT, err => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`)
})