const getRequest = (request, response) => {
    switch (request.url) {
        case "/users":
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(request.users))
            response.end()
            break;

        default:
            response.statusCode = 400
            response.write(`CANNOT GET ${request.url}`)
            response.end()
    }
}


export { getRequest };