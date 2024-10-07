import { IncomingMessage, ServerResponse } from 'http';
interface CustomIncomingMessage extends IncomingMessage {
    body?: any;
}

type NextFunction = (req: CustomIncomingMessage, res: ServerResponse) => void;

const getBody = (request: CustomIncomingMessage, response: ServerResponse, next: NextFunction): void => {
    let data: Uint8Array[] = [];

    request.on("data", (dataChunk: Uint8Array) => {
        data.push(dataChunk);
    });

    request.on("end", () => {
        request.body = Buffer.concat(data).toString();

        if (request.headers["content-type"] === "application/json") {
            try {
                request.body = JSON.parse(request.body);
            } catch (error) {
                showError(response, 400, 'Invalid JSON');
                return;
            }
        }

        next(request, response);
    });
};

const showError = (response: ServerResponse, code: number, message: string): void => {
    response.statusCode = code;
    response.write(message);
    response.end();
};


const getUrlSegments = (url: string): string[] => {
    return url.split("/").filter(segment => segment !== "" && segment !== "api");
};

export {
    getBody,
    getUrlSegments,
    showError
};
