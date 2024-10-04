const getRequest = (request, response) => {
    switch (request.url) {
        case "/users":

            if (request.query.searchParams.get("id")) {
                const id = request.query.searchParams.get("id")
                response.statusCode = 200
                response.setHeader("Content-Type", "application/json")
                response.write(JSON.stringify(request.users[id]))
                response.end()
            } 
            else {

                response.statusCode = 200
                response.setHeader("Content-Type", "application/json")
                response.write(JSON.stringify(request.users))
                response.end()
            }
            break;

        default:
            response.statusCode = 400
            response.write(`CANNOT GET ${request.url}`)
            response.end()
    }
}


export { getRequest };