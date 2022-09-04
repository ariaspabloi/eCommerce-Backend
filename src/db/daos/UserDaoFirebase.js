import {FirebaseContainer} from "../containers/FirebaseContainer.js";

class UserDaoFirebase extends FirebaseContainer {
    constructor() {
        super('users')
    }

    async getByEmail(email) {
        const users = await super.getAll();
        const user = users.find(u => u.email === email)
        return user
    }

    async checkEmail(email) {
        try {
            const object = await this.getByEmail(email)
            if (object) return true;
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default UserDaoFirebase;