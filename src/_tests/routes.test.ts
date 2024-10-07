import { server } from '../server'
import * as http from 'http';

describe('Server API Routes', () => {
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

    test('Return 404 for non-API routes', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(404);
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

    test('Return 200 for valid /api/* routes', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/users',
            method: 'GET',
        };

        const req = http.request(options, (res) => {
            try {
                expect(res.statusCode).toBe(200);
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
    
    test('Return 404 for invalid /api/ routes', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/invalid',
            method: 'GET',
        };
    
        const req = http.request(options, (res) => {
           
            try {
                    expect(res.statusCode).toBe(404);
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
    
    test('Return 400 for unsupported methods', (done) => {
        const options = {
            hostname: 'localhost',
            port,
            path: '/api/test',
            method: 'PATCH',
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
});