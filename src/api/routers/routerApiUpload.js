const { Router } = require('express')
const path = require("path");
const Resize = require("../../util/Resize");
const routerApiUpload = new Router()
const upload = require("../middlewares/uploadMiddleware")

routerApiUpload.post('/', upload.single('image'), async function (req, res) {
    const __dirname = process.cwd()
    console.log(__dirname)
    const imagePath = path.join(__dirname, 'src/public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ link: `${req.protocol}://${req.get('host')}/images/${filename}`});
});

module.exports = routerApiUpload