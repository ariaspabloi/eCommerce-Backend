import bcrypt from 'bcrypt';

let random = 0;
const generateId = () => {
    random = (random + 1) % 9 + 1
    return Date.now() + (10000000000000 * random);
}
const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
const validPassword = async (lpw, password) => await bcrypt.compare(lpw, password)
export {generateId, generateHash, validPassword};