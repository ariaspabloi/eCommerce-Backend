export default class InfoController {
    constructor() {
    }

    infoGetController = async (req, res) => {
        res.json(await req.user)
    }
}