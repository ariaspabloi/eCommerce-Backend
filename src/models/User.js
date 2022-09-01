export default class User {
    #_id
    #email
    #password
    #name
    #lastname
    #phone
    #image

    constructor({_id, email, password, name, lastname, phone, image}) {
        this.#setId(_id)
        this.#setEmail(email)
        this.#password = password;
        this.#name = name;
        this.#lastname = lastname;
        this.#phone = phone;
        this.#image = image;
    }


    get _id() {
        return this.#_id;
    }

    #setId(value) {
        if (!value) return
        value = value.toString()
        if (typeof value !== 'string')
            throw new Error('el _id debe estar formado por caracteres');
        this.#_id = value
    }

    get email() {
        return this.#email;
    }

    #setEmail(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el email debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el email debe tener al menos 6 caracteres');
        this.#email = value
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el password debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el password debe tener al menos 6 caracteres');
        this.#password = value
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el name debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el name debe tener al menos 6 caracteres');
        this.#name = value
    }

    get lastname() {
        return this.#lastname;
    }

    set lastname(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el lastname debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el lastname debe tener al menos 6 caracteres');
        this.#lastname = value
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el phone debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el phone debe tener al menos 6 caracteres');
        this.#phone = value
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('la image debe estar formado por caracteres');
        if (value.length < 3)
            throw new Error('la image debe tener al menos 3 caracteres');
        this.#image = value
    }

    dto() {
        return Object.freeze({
            ...((this.#_id) && {_id: this.#_id}),
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            phone: this.#phone,
            image: this.#image,
        })
    }
}