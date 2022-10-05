export default class UserInfoController {
    constructor() {
    }

    getUserInfo = async (req, res) => {
        res.json({
            message: 'You made it to the secure route',
            email: req.user.email,
            id: req.user.id
        })
    }
}