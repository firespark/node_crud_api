const getBody = (request, response, next) => {
    let data = [];

    request.on("data", dataChunk => {
        data.push(dataChunk);
    })

    request.on("end", () => {
        request.body = Buffer.concat(data).toString();
        if (request.headers["content-type"] === "application/json") {

            request.body = JSON.parse(request.body);
        }

        next(request, response);
    })
}

const getUrlSegments = (url) => {
    return url.split("/").filter(segment => segment !== "");
};

const show404 = (response, url) => {
    response.statusCode = 404;
    response.write(`Cannot find ${url}`);
    response.end();
};

export {
    getBody,
    getUrlSegments,
    show404
};