const getRequest = (request, response) => {
    switch (request.url) {
        default:
            response.statusCode = 400
            response.write(`CANNOT GET ${request.url}`)
            response.end()
    }
}


export { getRequest };