let isAdmin = true

function onlyAdmin(req, res, next) {
    if (isAdmin) {
        next()
    } else {
        res.status(403).json({error:-1,descripcion:`Ruta ${req.originalUrl} metodo ${req.method} no autorizado`});
    }
}

module.exports = { onlyAdmin }