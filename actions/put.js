const putRequest = (request, response) => {
    switch (request.url) {
        default:
            response.statusCode = 400
            response.write(`CANNOT PUT ${request.url}`)
            response.end()
    }
}


export { putRequest };