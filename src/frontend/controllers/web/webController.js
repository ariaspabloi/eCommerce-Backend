function webGetController(req, res) {
    res.sendFile('index.html', {root: './views'})
}

function loginGetController(req, res) {
    res.sendFile('login.html', {root: './views'})
}

function byeGetController(req, res) {
    res.sendFile('bye.html', {root: './views'})
}

export {
    webGetController, loginGetController, byeGetController
};