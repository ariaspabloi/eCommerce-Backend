export default class Product {
    #id
    #name
    #description
    #price
    #image

    constructor({id, name, description, price, image}) {
        this.#setId(id);
        this.#setName(name);
        this.#description = description;
        this.#price = price;
        this.#image = image;
    }

    #setId(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el id debe estar formado por caracteres');
        this.#id = value
    }

    #setName(value) {
        if (!value)
            throw new Error('"name" es un campo requerido');
        if (typeof value !== 'string')
            throw new Error('el name debe estar formado por caracteres');
        if (value.length < 4)
            throw new Error('el name debe tener al menos 4 caracteres');
        this.#name = value
    }

    set description(value) {
        if (!value)
            throw new Error('"description" es un campo requerido');
        if (typeof value !== 'string')
            throw new Error('la descripcion debe estar formado por caracteres');
        if (value.length < 4)
            throw new Error('la descripcion debe tener al menos 4 caracteres');
        this.#description = value;
    }

    set price(value) {
        if (!value)
            throw new Error('"price" es un campo requerido');
        if (isNaN(value))
            throw new Error('el precio debe ser numerico');
        if (value <= 0)
            throw new Error('el precio debe ser mayor a cero');
        this.#price = value;
    }

    set image(value) {
        if (!value)
            throw new Error('"image" es un campo requerido');
        if (typeof value !== 'string')
            throw new Error('la imagen debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('la imagen debe tener al menos 6 caracteres');
        this.#image = value;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get price() {
        return this.#price;
    }

    get image() {
        return this.#image;
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            name: this.#name,
            description: this.#description,
            price: this.#price,
            image: this.#image
        })
    }

}