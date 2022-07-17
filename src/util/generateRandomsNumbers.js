const generateRandomsNumbers = (cant) => {
    const numbers = {}
    const min = 1;
    const max = 1000;
    let index;
    for (let i = 0; i < cant; i++) {
        index = Math.floor(Math.random() * (max - min + 1)) + min
        if (!numbers[index]) numbers[index] = 0
        ++numbers[index]
    }
    return numbers;

}
process.on('message', msg => {
    const randomNumbers = generateRandomsNumbers(msg)
    process.send(randomNumbers)
})

process.send('ready')