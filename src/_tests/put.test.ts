
import * as http from 'http';
import { data } from "../data";
import { server } from '../server';

describe('PUT Tests', () => {
    const fakeUsers = [{
        "id": "fcc8d6bf-3848-4838-aa2a-89b3b9359727",
        "username": "Hatsune Miku",
        "age": 16,
        "hobbies": [
            "Dancing",
            "Singing",
            "Pipe Bombs"
        ]
    }, {
        "id": "43dcfe58-1ca8-43ab-a6c2-463ea7117bf2",
        "username": "Neco Arc",
        "age": 0,
        "hobbies": [
            "Being themselves",
            "Murder",
            "Cannibalism"
        ]
    }, {
        "id": "3d928591-9153-4f5a-aa04-8f434f0e03ff",
        "username": "Hello Kitty",
        "age": 48,
        "hobbies": [
            "Traveling",
            "Music",
            "Eating cookies"
        ]
        }];
    
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
        data.push(...fakeUsers);
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users/fcc8d6bf-3848-4838-aa2a-89b3b9359727',
            method: 'PUT',
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
        data.push(...fakeUsers);
        const requestBody = JSON.stringify({
            wrong: 'format'
        });
        
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users/fcc8d6bf-3848-4838-aa2a-89b3b9359727',
            method: 'PUT',
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

    test('Return 400 when user not found', (done) => {
        data.push(...fakeUsers);
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
            path: '/api/users/00000000-0000-0000-0000-000000000000',
            method: 'PUT'
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

    test('Return 200 after changing the user', (done) => {
        data.push(...fakeUsers);
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
            path: '/api/users/fcc8d6bf-3848-4838-aa2a-89b3b9359727',
            method: 'PUT'
        };
        

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(200);
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

    test('Return user in array after changing user', (done) => {
        data.push(...fakeUsers);
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
            path: '/api/users/fcc8d6bf-3848-4838-aa2a-89b3b9359727',
            method: 'PUT'
        };
        

        const req = http.request(options, (res) => {
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(response);
                    expect(parsedData).toMatchObject(testUser);
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

