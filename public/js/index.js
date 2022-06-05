const socket = io()

socket.on('messages', ({ messages }) => {
    showMessages(messages)
})

socket.on('products', ({ products }) => {
    showProducts(products)
})


const btnAddMessage = document.getElementById('sendBtn')
btnAddMessage.addEventListener('click', event => {
    const autor = document.getElementById('inputAutor').value
    const msg = document.getElementById('inputMsg').value
    const nowDate = new Date()
    const date = nowDate.getFullYear() + "-" + nowDate.getDate() + "-" + (nowDate.getMonth()+1) + " " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds()
    console.log(date)
    if(!autor){
        console.log("email no ingresado")
        return;
    }
    document.getElementById('inputMsg').value = "";
    socket.emit('message', { autor, msg , date})
})

const btnAddProduct = document.getElementById('addProduct_btn')
btnAddProduct.addEventListener('click', event => {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    socket.emit('product', { title,price,thumbnail })
})


async function showProducts(products) {
    const divProducts = document.getElementById('products')
    //divMessages.innerHTML = messages.map(m => `<p>${m.autor}: ${m.msg}</p>`).join("")
    divProducts.innerHTML = await buildTemplate('templates/showProducts.hbs', { products });
}

async function showMessages(messages) {
    const divMessages = document.getElementById('messages')
    divMessages.innerHTML = await buildTemplate('templates/chat.hbs', { messages });
}

async function buildTemplate(url,data){
    const template = await fetchTemplate(url);
    const htmlGenerator = Handlebars.compile(template);
    return htmlGenerator(data)
}

function fetchTemplate(url){
    return fetch(url).then(res => res.text())
}