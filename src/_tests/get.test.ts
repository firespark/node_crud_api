
import * as http from 'http';
import { data } from "../data";
import { server } from '../server';

describe('GET Tests', () => {
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

    test('Return empty array if users is empty', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });

            res.on('end', () => {
                try {
                    expect(response).toBe('[]');
                    done();
                  }
                  catch (err) {
                    done(err);
                  }
            });

        });
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();
    });

    test('Return users if users is not empty', (done) => {
        data.push(...fakeUsers);
        
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(response);
                    expect(parsedData).toEqual(fakeUsers);
                    done();
                  }
                  catch (err) {
                    done(err);
                  }
            });

        });
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();
    });

    test('Return correct user by ID', (done) => {
        data.push(...fakeUsers);
        const randomFakeUserID: number = Math.floor(Math.random() * fakeUsers.length);

        const options = {
            hostname: 'localhost',
            port,
            path: `/api/users/${fakeUsers[randomFakeUserID].id}`,
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            let response = '';

            res.on('data', (chunk) => {
                response += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(response);
                    expect(parsedData).toEqual(fakeUsers[randomFakeUserID]);
                    done();
                  }
                  catch (err) {
                    done(err);
                  }
            });

        });
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();
    });

    test('Return 400 if user ID is not found', (done) => {
        data.push(...fakeUsers);

        const options = {
            hostname: 'localhost',
            port,
            path: `/api/users/00000000-0000-0000-0000-000000000000`,
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(400);
                done();
              }
              catch (err) {
                done(err);
              }
        });
        req.on('error', (err) => {
            done(err);
        });
    
        req.end();
    });

});

