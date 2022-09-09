const requireAuthorization = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        //test  option
        //next()
        ////
        res.status(401).json({msg: 'este recurso requiere autenticacion'})
    }
}

export default requireAuthorization;