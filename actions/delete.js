const deleteRequest = (request, response) => {
    switch (request.url) {
        default:
            response.statusCode = 400
            response.write(`CANNOT DELETE ${request.url}`)
            response.end()
    }
}


export { deleteRequest };