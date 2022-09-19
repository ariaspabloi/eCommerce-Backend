import bcrypt from 'bcrypt';
import crypto from 'crypto'

const generateId = crypto.randomUUID;
const generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
const validPassword = async (lpw, password) => await bcrypt.compare(lpw, password)
export {generateId, generateHash, validPassword};