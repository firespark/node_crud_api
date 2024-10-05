import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { fork } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const numCPUs = os.cpus().length;
const BASE_PORT = parseInt(process.env.PORT, 10);

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    let currentWorker = 0;
    const workers = [];

    for (let i = 1; i < numCPUs; i++) {
        const worker = cluster.fork({ PORT: BASE_PORT + i });
        workers.push(worker);
    }

    const loadBalancer = http.createServer((req, res) => {
        const workerPort = BASE_PORT + 1 + (currentWorker % (numCPUs - 1));
        currentWorker++;

        const proxyReq = http.request(
            {
                hostname: 'localhost',
                port: workerPort,
                path: req.url,
                method: req.method,
                headers: req.headers,
            },
            (proxyRes) => {
                res.writeHead(proxyRes.statusCode, proxyRes.headers);
                proxyRes.pipe(res, { end: true });
            }
        );

        req.pipe(proxyReq, { end: true });
    });

    loadBalancer.listen(BASE_PORT, () => {
        console.log(`Load balancer is listening on port ${BASE_PORT}`);
    });

} else {
    import('./server.js').then(() => {
        console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
    });
}
