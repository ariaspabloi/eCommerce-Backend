const infoGetController = async (req, res) => {
    res.json(await req.user)
}


module.exports = {infoGetController}