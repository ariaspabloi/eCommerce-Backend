import Api400Error from "../util/errors/Api400Error.js";

export default class Author {
    #email
    #name
    #lastname
    #age
    #alias
    #avatar

    constructor({email, name, lastname, age, alias, avatar}) {
        this.#setEmail(email)
        this.name = name
        this.lastname = lastname
        this.age = age
        this.alias = alias
        this.avatar = avatar
    }

    get email() {
        return this.#email;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('el name del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Api400Error('el name del autor debe tener al menos 3 caracteres');
        this.#name = value
    }

    get lastname() {
        return this.#lastname;
    }

    set lastname(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('el lastname del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Api400Error('el lastname del autor debe tener al menos 3 caracteres');
        this.#lastname = value
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        if (!value) return
        if (isNaN(value))
            throw new Api400Error('el age del author debe estar formado por numeros');
        if (value < 1)
            throw new Api400Error('el age del autor debe tener al menos mas de 1 anio');
        this.#age = value
    }

    get alias() {
        return this.#alias;
    }

    set alias(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('el alias del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Api400Error('el alias del autor debe tener al menos 3 caracteres');
        this.#alias = value
    }

    get avatar() {
        return this.#avatar;
    }

    set avatar(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('el avatar del author debe estar formado por caracteres');
        if (value.length < 3)
            throw new Api400Error('el avatar del autor debe tener al menos 3 caracteres');
        this.#avatar = value
    }

    #setEmail(value) {
        if (!value) return
        if (typeof yourVariable === 'string')
            throw new Api400Error('el author no tiene email');
        this.#email = value
    }

    dto() {
        return Object.freeze({
            email: this.#email,
            name: this.#name,
            lastname: this.#lastname,
            age: this.#age,
            alias: this.#alias,
            avatar: this.#avatar,
        })
    }
}