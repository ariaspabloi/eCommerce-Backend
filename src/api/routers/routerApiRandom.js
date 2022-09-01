import { Router } from 'express';
import { fork } from 'child_process';

const routerApiRandom = new Router()

routerApiRandom.get('/', (req, res) => {
    const generator = fork('src/util/generateRandomsNumbers.js')
    generator.on('message', msg => {
        if (msg === 'ready') {
            generator.send(req.query.cant || 100000000)
        } else {
            res.json(msg)
        }
    })
})


export default routerApiRandom;