import path from "path";
import Resize from "../../../util/Resize.js";

export default class UploadController {
    constructor() {
    }

    uploadPostController = async (req, res) => {
        const __dirname = process.cwd()
        const imagePath = path.join(__dirname, 'src/public/images');
        const fileUpload = new Resize(imagePath);
        if (!req.file) {
            res.status(401).json({error: 'Please provide an image'});
        }
        const filename = await fileUpload.save(req.file.buffer);
        return res.status(200).json({link: `${req.protocol}://${req.get('host')}/images/${filename}`});
    }
}