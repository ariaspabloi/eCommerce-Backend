import sharp from 'sharp';
import {generateId} from './helpers.js';
import path from 'path';

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    static filename() {
        return `${generateId()}.png`;
    }

    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);
        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}

export default Resize;