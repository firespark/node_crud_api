const getRequest = (request, response) => {

    const urlSegments = request.url.split("/").filter(segment => segment !== "");

    if (urlSegments[0] === "users") {
        if (urlSegments.length === 2) {

            const id = urlSegments[1]

            if (request.users[id]) {
                response.statusCode = 200
                response.setHeader("Content-Type", "application/json")
                response.write(JSON.stringify(request.users[id]))
                response.end()
            } else {
                response.statusCode = 404
                response.write(`User with ID ${id} not found`)
                response.end()
            }
        } 
        else {

            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            response.write(JSON.stringify(request.users))
            response.end()
        }
    } 
    else {
        // Handle unexpected routes
        response.statusCode = 400
        response.write(`CANNOT GET ${request.url}`)
        response.end()
    }
}


export { getRequest };