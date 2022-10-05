import Api400Error from "../util/errors/Api400Error.js";

export default class User {
    #id
    #email
    #password
    #name
    #lastname
    #phone
    #image

    constructor({id, email, password, name, lastname, phone, image}) {
        this.#setId(id)
        this.#setEmail(email)
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
    }


    get id() {
        return this.#id;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        if (!value)
            throw new Api400Error('El campo password es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('el password debe estar formado por caracteres');
        if (value.length < 6)
            throw new Api400Error('el password debe tener al menos 6 caracteres');
        this.#password = value
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value)
            throw new Api400Error('El campo name es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('el name debe estar formado por caracteres');
        if (value.length <= 4)
            throw new Api400Error('el name debe tener al menos 4 caracteres');
        this.#name = value
    }

    get lastname() {
        return this.#lastname;
    }

    set lastname(value) {
        if (!value)
            throw new Api400Error('El campo lastname es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('el lastname debe estar formado por caracteres');
        if (value.length <= 4)
            throw new Api400Error('el lastname debe tener al menos 4 caracteres');
        this.#lastname = value
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        if (!value)
            throw new Api400Error('El campo phone es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('el phone debe estar formado por caracteres');
        if (value.length < 6)
            throw new Api400Error('el phone debe tener al menos 6 caracteres');
        this.#phone = value
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        if (!value)
            throw new Api400Error('El campo image es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('la image debe estar formado por caracteres');
        if (value.length < 3)
            throw new Api400Error('la image debe tener al menos 3 caracteres');
        this.#image = value
    }

    #setId(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('El id debe estar formado por caracteres.');
        this.#id = value
    }

    #setEmail(value) {
        if (!value)
            throw new Api400Error('El campo email es requerido.');
        if (typeof value !== 'string')
            throw new Api400Error('El email debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('El email debe tener al menos 6 caractere.s');
        this.#email = value
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            phone: this.#phone,
            image: this.#image,
        })
    }
}