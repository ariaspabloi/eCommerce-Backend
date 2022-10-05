import {mode} from './config.js';
import cluster from 'cluster';
import os from 'os';
import {runServer} from "./server.js";
import logger from "./util/logger.js";

process.on('unhandledRejection', error => {
    throw error
})

process.on('uncaughtException', error => {
    logger.error(error)
})

if (mode === "CLUSTER" && cluster.isPrimary) {
    const numCPUs = os.cpus().length
    for (let i = 0; i < numCPUs; i++) cluster.fork();
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    runServer()
}