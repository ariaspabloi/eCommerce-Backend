const fs = require('fs');

class ProductDao {
    constructor(path) {
        this.path = `.\\persistence\\databases\\${path}`;
    }

    async save(object) {
        object.id = `${Date.now()}`;
        try {
            let objects = await this.getAll();
            if (objects.some(o => o.id == object.id)) throw new Error('el id ya existia');
            objects.push(object);
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}, ${error.message}`);
        }
        return object;
    }

    async update(object, id) {
        const objects = await this.getAll();
        const objectIndex = objects.findIndex(p => p.id == id);
        if (objectIndex == -1) throw new Error("No hay persona con el id");
        object.id = id;
        objects[objectIndex] = object;
        fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        return object;

    }

    async getById(id) {
        const objects = await this.getAll();
        const object = objects.find(p => p.id == id);
        if (object === undefined) throw new Error(`no existe objeto con id ${id}`)
        return object;
    }

    async getAll() {
        let objects;
        try {
            objects = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            throw new Error(`Error en leer archivo ${this.path}`);
        }
        if (objects.length == 0) return [];
        objects = [...JSON.parse(objects)];
        return objects;
    }

    async deleteById(id) {
        try {
            let objects = await this.getAll();
            let index = objects.findIndex(o => o.id == id);
            if (index == -1) throw new Error('no existe objeto con ese id');
            objects.splice(index, index == 0 ? index + 1 : index);
            return fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en escritura, al borrar objeto de id ${id}, ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            return fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        } catch (error) {
            throw new Error("Error en escritura, al borrar todos los objetos");
        }
    }
}

module.exports = { ProductDao };