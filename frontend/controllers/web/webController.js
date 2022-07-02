function webGetController(req, res) {
    res.sendFile('index.html', { root: './views' })
}
function loginGetController(req, res) {
    res.sendFile('login.html', { root: './views' })
}

const byeGetController = (req, res) => {
    res.sendFile('bye.html', { root: './views' })
}

module.exports = {
    webGetController, loginGetController, byeGetController
}