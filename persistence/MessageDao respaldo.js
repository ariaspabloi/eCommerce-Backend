
const fs = require('fs');

class MessageDao {
    constructor(path) {
        this.path = `.\\persistence\\databases\\${path}`;
    }

    async save(object) {
        const date = new Date(Date.now());
        object.date = date.toLocaleString();
        let objects = await this.getAll();
        objects.push(object);
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}`);
        }
        return object;

    }

    async getAll() {
        let objects;
        try {
            objects = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            //throw new Error(`Error en leer archivo ${this.path}`);
            console.log(`Error en leer archivo ${this.path}`);
        }
        if (objects.length == 0) return [];
        objects = [...JSON.parse(objects)];
        return objects;
    }
}

module.exports = { MessageDao };