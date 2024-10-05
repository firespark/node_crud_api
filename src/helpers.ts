import { IncomingMessage, ServerResponse } from 'http';
interface CustomIncomingMessage extends IncomingMessage {
    body?: any; // Поле body может быть любого типа (например, строка или объект)
}

// Определяем тип для функции next
type NextFunction = (req: CustomIncomingMessage, res: ServerResponse) => void;

const getBody = (request: CustomIncomingMessage, response: ServerResponse, next: NextFunction): void => {
    let data: Uint8Array[] = [];

    // Читаем данные по частям
    request.on("data", (dataChunk: Uint8Array) => {
        data.push(dataChunk);
    });

    // Когда все данные получены
    request.on("end", () => {
        // Собираем все куски данных в одну строку
        request.body = Buffer.concat(data).toString();

        // Если контент в формате JSON, парсим его
        if (request.headers["content-type"] === "application/json") {
            try {
                request.body = JSON.parse(request.body);
            } catch (error) {
                showError(response, 400, 'Invalid JSON');
                return;
            }
        }

        // Передаем управление следующей функции
        next(request, response);
    });
};

// Функция для отображения ошибок
const showError = (response: ServerResponse, code: number, message: string): void => {
    response.statusCode = code;
    response.write(message);
    response.end();
};


// Функция для получения сегментов URL
const getUrlSegments = (url: string): string[] => {
    return url.split("/").filter(segment => segment !== "");
};

export {
    getBody,
    getUrlSegments,
    showError
};
