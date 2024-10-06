import cluster, { Worker } from 'cluster';
import http, { IncomingMessage, ServerResponse } from 'http';
import os from 'os';
import "dotenv/config";

const numCPUs: number = os.cpus().length;
const BASE_PORT: number = parseInt(process.env.PORT || '3000', 10);

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    let currentWorker: number = 0;
    const workers: Worker[] = [];

    for (let i = 1; i < numCPUs; i++) {
        const worker: Worker = cluster.fork({ PORT: BASE_PORT + i });
        workers.push(worker);
    }

    const loadBalancer = http.createServer((req: IncomingMessage, res: ServerResponse) => {
        const workerPort: number = BASE_PORT + 1 + (currentWorker % (numCPUs - 1));
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
                if (proxyRes.statusCode) {
                    res.writeHead(proxyRes.statusCode, proxyRes.headers);
                }
                proxyRes.pipe(res, { end: true });
            }
        );

        req.pipe(proxyReq, { end: true });
    });

    loadBalancer.listen(BASE_PORT, () => {
        console.log(`Load balancer is listening on port ${BASE_PORT}`);
    });

} else {
    import('./server.ts').then(() => {
        console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
    });
}
