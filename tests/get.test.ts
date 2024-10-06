import { getRequest } from '../src/actions/get.ts';
import { CustomIncomingMessage } from '../src/types.ts';
import { ServerResponse } from 'http';

function mockResponse(): Partial<ServerResponse> {
    const res: Partial<ServerResponse> = {
        statusCode: 0,
        setHeader: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
    };
    return res;
}

function mockRequest(url: string, users: any[] = []): Partial<CustomIncomingMessage> {
    return {
        url,
        users,
    };
}

describe('getRequest', () => {
    it('should return an empty array for /users if no users exist', () => {
        const req = mockRequest('/users', []);
        const res = mockResponse();

        getRequest(req as CustomIncomingMessage, res as ServerResponse);

        expect(res.statusCode).toBe(200);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.write).toHaveBeenCalledWith(JSON.stringify([]));
        expect(res.end).toHaveBeenCalled();
    });

    it('should return user data for a specific user ID', () => {
        const users = [{ id: '123', name: 'John Doe' }];
        const req = mockRequest('/users/123', users);
        const res = mockResponse();

        getRequest(req as CustomIncomingMessage, res as ServerResponse);

        expect(res.statusCode).toBe(200);
        expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(res.write).toHaveBeenCalledWith(JSON.stringify(users[0]));
        expect(res.end).toHaveBeenCalled();
    });

    it('should return 400 if user ID is not found', () => {
        const users = [{ id: '123', name: 'John Doe' }];
        const req = mockRequest('/users/999', users);
        const res = mockResponse();

        getRequest(req as CustomIncomingMessage, res as ServerResponse);

        expect(res.statusCode).toBe(400);
        expect(res.write).toHaveBeenCalledWith('User with ID 999 not found');
        expect(res.end).toHaveBeenCalled();
    });


    it('should return 404 for an unknown route', () => {
        const req = mockRequest('/unknown');
        const res = mockResponse();

        getRequest(req as CustomIncomingMessage, res as ServerResponse);

        expect(res.statusCode).toBe(404);
        expect(res.write).toHaveBeenCalledWith('Cannot find /unknown');
        expect(res.end).toHaveBeenCalled();
    });
});
