const {Router} = require('express')
const os = require('os')
const compression =  require('compression')

const routerInfo = new Router()
const info = {
    "argv" : process.argv.slice(2),
    "so" : process.platform,
    "nodev": process.version,
    "memrss": process.memoryUsage().rss,
    "execPath": process.execPath,
    "pid": process.pid,
    "projectpath": process.cwd(),
    "cpus": os.cpus().length
}

routerInfo.get('/normal', async (req, res) => {
    res.json(info)
})
routerInfo.get('/compressed', compression(),async (req, res) => {
    res.json(info)
})

module.exports = routerInfo