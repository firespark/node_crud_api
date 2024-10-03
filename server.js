import * as http from 'http';

const PORT = process.env.PORT || 4000

const server = http.createServer((request, response) => {

    switch (request.method) {
        case "GET":

            break;

        case "POST":
            break;

        case "PUT":
            break;

        case "DELETE":
            break;

        default:

            response.statusCode = 400
            response.write("No Response")
            response.end()
    }
})


server.listen(PORT, err => {
    err ? console.error(err) : console.log(`listening on port ${PORT}`)
})