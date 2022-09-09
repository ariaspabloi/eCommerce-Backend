import {Router} from 'express';
import os from 'os';
import compression from 'compression';
import requireAuthorization from '../../middlewares/authorizationMiddleware.js';

const info = {
    "argv": process.argv.slice(2),
    "so": process.platform,
    "nodev": process.version,
    "memrss": process.memoryUsage().rss,
    "execPath": process.execPath,
    "pid": process.pid,
    "projectpath": process.cwd(),
    "cpus": os.cpus().length
}

export default class InfoRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .get('/', requireAuthorization, controller.infoGetController)
            .get('/normal', async (req, res) => {
                res.json(info)
            })
            .get('/compressed', compression(), async (req, res) => {
                res.json(info)
            });
    }

    get() {
        return this.#router
    }
}