const fs = require('fs');

class CartDao {
    constructor(path) {
        this.path = `.\\persistence\\databases\\${path}`;
    }

    async save(object) {
        try {
            object.id = `${Date.now()}`;
            let objects = await this.getAll();
            if (objects.some(o => o.id == object.id)) throw new Error('id ya registrado')
            objects.push(object);
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}, ${error.message}`);
        }
        return object;

    }

    async update(object, id) {
        try {
            const objects = await this.getAll();
            const objectIndex = objects.findIndex(p => p.id == id);
            if (objectIndex == -1) throw new Error(`objecto no encontrado`)
            object.id = id;
            objects[objectIndex] = object;
            fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en actualizar objeto de id ${object.id}, ${error.message}`);
        }
        return object;
    }

    async getById(id) {
        try {
            const objects = await this.getAll();
            const object = objects.find(p => p.id == id);
            if (object === undefined) throw new Error("no hay producto con ese id");
            return object;
            //error.tipo = 'db not found'
        } catch (error) {
            throw new Error(`Error en encontrar objeto de id ${id}, ${error.message}`);
        }
    }

    async getAll() {
        let objects;
        try {
            objects = await fs.promises.readFile(this.path, 'utf-8');
        } catch (error) {
            throw new Error(`Error en carritos del archivo ${this.path}`);
        }
        if (objects.length == 0) return [];
        objects = [...JSON.parse(objects)];
        return objects;
    }

    async deleteById(id) {
        try {
            let objects = await this.getAll();
            let index = objects.findIndex(o => o.id == id);
            if (index == -1) throw new Error(`objeto  no encontrado`);
            objects.splice(index, index == 0 ? index + 1 : index);
            return fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));
        } catch (error) {
            throw new Error(`Error en borrado de carrito de id ${id}, ${error.message}`);
        }
    }

    async deleteAll() {
        try {
            return fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
        } catch (error) {
            throw new Error("Error en escritura al borrar todos los objetos");
        }
    }
}

module.exports = { CartDao };