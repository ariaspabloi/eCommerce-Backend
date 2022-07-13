const userDao = require('../models/indexUser')
const registerUser = ({username,password}) => {
    userDao.validateUniqueUsername(username)
    if(!username || !password) throw Error('falta el campo obligatorio')
    return userDao.save({username,password})
}

const authenticateUser = async (username,password)=>{
    let user;
    try{
        user = await userDao.getByUsername(username)
        if(user.password !== password) throw Error()
        return user;
    }catch (error){
        throw error;
    }
}

module.exports = {registerUser,authenticateUser}