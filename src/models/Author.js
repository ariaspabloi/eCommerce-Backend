export default class Author {
    #_id
    #email
    #name
    #lastname
    #age
    #alias
    #avatar

    constructor({_id, email, name, lastname, age, alias, avatar}) {
        this.#set_Id(_id);
        this.#setEmail(email)
        this.#name = name
        this.#lastname = lastname
        this.#age = age
        this.#alias = alias
        this.#avatar = avatar
    }

    #set_Id(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el _id debe estar formado por caracteres');
        this.#_id = value
    }

    #setEmail(value) {
        if (!value) return
        if (typeof yourVariable === 'string')
            throw new Error('el author no tiene email');
        this.#email = value
    }

    set name(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el name del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Error('el name del autor debe tener al menos 3 caracteres');
        this.#name = value
    }

    set lastname(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el lastname del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Error('el lastname del autor debe tener al menos 3 caracteres');
        this.#lastname = value
    }

    set age(value) {
        if (!value) return
        if (isNaN(nalue))
            throw new Error('el age del author debe estar formado por numeros');
        if (value.length > 1)
            throw new Error('el age del autor debe tener al menos mas de 1 anio');
        this.#age = value
    }

    set alias(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el alias del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Error('el alias del autor debe tener al menos 3 caracteres');
        this.#alias = value
    }

    set avatar(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el avatar del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Error('el avatar del autor debe tener al menos 3 caracteres');
        this.#avatar = value
    }


    get _id() {
        return this.#_id;
    }

    get email() {
        return this.#email;
    }

    get name() {
        return this.#name;
    }

    get lastname() {
        return this.#lastname;
    }

    get age() {
        return this.#age;
    }

    get alias() {
        return this.#alias;
    }

    get avatar() {
        return this.#avatar;
    }

    dto() {
        return Object.freeze({
            ...((this.#_id) && {_id: this.#_id}),
            email: this.#email,
            name: this.#name,
            lastname: this.#lastname,
            age: this.#age,
            alias: this.#alias,
            avatar: this.#avatar,
        })
    }
}