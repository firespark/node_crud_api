import { getRequest } from '../actions/get.js';

describe('getRequest', () => {
    let request;
    let response;

    beforeEach(() => {
        request = {
            url: '',
            users: {
                1: { id: 1, name: 'John Doe' },
                2: { id: 2, name: 'Jane Doe' }
            }
        };

        response = {
            statusCode: null,
            headers: {},
            body: '',
            setHeader: jest.fn((header, value) => {
                response.headers[header] = value;
            }),
            write: jest.fn((chunk) => {
                response.body += chunk;
            }),
            end: jest.fn(() => { })
        };
    });

    it('should return a user by ID', () => {
        request.url = '/users/1';

        getRequest(request, response);

        expect(response.statusCode).toBe(200);
        expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(response.body).toBe(JSON.stringify({ id: 1, name: 'John Doe' }));
        expect(response.end).toHaveBeenCalled();
    });

    it('should return all users if no ID is provided', () => {
        request.url = '/users';

        getRequest(request, response);

        expect(response.statusCode).toBe(200);
        expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(response.body).toBe(JSON.stringify(request.users));
        expect(response.end).toHaveBeenCalled();
    });

    it('should return 400 if user not found', () => {
        request.url = '/users/999';

        getRequest(request, response);

        expect(response.statusCode).toBe(400);
        expect(response.body).toBe('User with ID 999 not found');
        expect(response.end).toHaveBeenCalled();
    });

});