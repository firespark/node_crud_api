const getBody = (request, response, next) => {
    let data = [];

    request.on("data", dataChunk => {
        data.push(dataChunk);
    })

    request.on("end", () => {
        request.body = Buffer.concat(data).toString();
        if (request.headers["content-type"] === "application/json"){

            request.body = JSON.parse(request.body);
        }

        next(request, response);
    })
}

const getUrlSegments = (url) => {
    return url.split("/").filter(segment => segment !== "");
};

export { 
    getBody,
    getUrlSegments
};