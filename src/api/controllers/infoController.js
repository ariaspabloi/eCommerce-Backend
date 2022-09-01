export const infoGetController = async (req, res) => {
    res.json(await req.user)
}