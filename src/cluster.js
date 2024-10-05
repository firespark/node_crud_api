import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { fork } from 'child_process';

const numCPUs = os.cpus().length;
const BASE_PORT = 4000;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Балансировщик нагрузки на порту 4000
    let currentWorker = 0;
    const workers = [];

    for (let i = 1; i < numCPUs; i++) {
        // Создаем воркеры
        const worker = cluster.fork({ PORT: BASE_PORT + i });
        workers.push(worker);
    }

    // Создаем сервер-балансировщик на порту 4000
    const loadBalancer = http.createServer((req, res) => {
        // Round-robin распределение запросов по воркерам
        const workerPort = BASE_PORT + 1 + (currentWorker % (numCPUs - 1));
        currentWorker++;

        // Проксируем запрос к воркеру
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
    // Воркеры запускают приложение
    import('./server.js').then(() => {
        console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
    });
}