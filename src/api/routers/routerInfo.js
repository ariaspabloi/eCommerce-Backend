const {Router} = require('express')

const routerInfo = new Router()
const info = {
    "argv" : process.argv.slice(2),
    "so" : process.platform,
    "nodev": process.version,
    "memrss": process.memoryUsage().rss,
    "execPath": process.execPath,
    "pid": process.pid,
    "projectpath": process.cwd()
}

routerInfo.get('/', async (req, res) => {
    res.json(info)
})

module.exports = routerInfo