let random = 0;
const generateId = () => {
    random = (random+1)%9+1
    return Date.now()+(10000000000000*random);
}
module.exports = {generateId}