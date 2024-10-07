
import * as http from 'http';
import { data } from "../data";
import { server } from '../server';

describe('POST Tests', () => {
    let port: number;
    let testServer: http.Server;

    beforeAll((done) => {
        testServer = server.listen(0, () => {
            port = (testServer.address() as any).port;
            done();
        });
    });

    afterAll((done) => {
        testServer.close(done);
    });
    afterEach(() => {
        data.length = 0;
    });

    test('Return 400 when sending empty request', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'POST',
        };

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(400);
                done();
            } catch (error) {
                done(error);
            }
        });
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();

    });

    test('Return 400 when sending wrong request', (done) => {
        const requestBody = JSON.stringify({
            wrong: 'format'
        });
        
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };
        

        const req = http.request(options, (res) => {
            
            try {
                expect(res.statusCode).toBe(400);
                done();
            } catch (error) {
                done(error);
            }
        });

        req.write(requestBody);
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();

    });

    test('Return 201 after adding new user', (done) => {
        const requestBody = JSON.stringify({
            "username": "Barbie",
            "age": 14,
            "hobbies": [
              "running",
              "quacking"
            ]
          });
        
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'POST'
        };
        

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(201);
                done();
            } catch (error) {
                done(error);
            }
        });

        req.write(requestBody);
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();

    });

    test('Return user in array after adding new user', (done) => {
        const testUser = {
            "username": "Barbie",
            "age": 14,
            "hobbies": [
                "running",
                "quacking"
            ]
        };
        const requestBody = JSON.stringify(testUser);
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'POST'
        };
        

        const req = http.request(options, (res) => {
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(response);
                    expect(parsedData).toEqual([
                        expect.objectContaining(testUser)
                    ]);
                    done();
                  }
                  catch (err) {
                    done(err);
                  }
            });

        });

        req.write(requestBody);
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();

    });
});

