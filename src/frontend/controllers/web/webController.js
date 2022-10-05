import os from 'os'

const info = {
    "argv": process.argv.slice(2),
    "so": process.platform,
    "nodev": process.version,
    "memrss": `${Math.floor(process.memoryUsage().rss / 1024 / 1024)} MB`,
    "execPath": process.execPath,
    "pid": process.pid,
    "projectpath": process.cwd(),
    "cpus": os.cpus().length
}

function webGetController(req, res) {
    res.sendFile('index.html', {root: './views'})
}

function webServerInfoController(req, res) {
    res.render('info', {
        helpers: info
    });
}

export {
    webGetController,
    webServerInfoController
}