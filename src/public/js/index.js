const socket = io()
const denormalize = normalizr.denormalize
const schema = normalizr.schema
const author = new schema.Entity('authors', {}, {idAttribute: 'email'});
const message = new schema.Entity('messages', {
    author: author
});

socket.on('messages', ({messages}) => {
    const messagesDesnormalized = denormalize(messages.result, [message], messages.entities)
    showCompressPercentage(messages, messagesDesnormalized)
    showMessages(messagesDesnormalized)
})

const btnServerinfo = document.getElementById('btn_serverinfo')
btnServerinfo.onclick = () => window.location.href = 'server-info'

const btnAddMessage = document.getElementById('sendBtn')
btnAddMessage.addEventListener('click', event => {
    const email = document.getElementById('inputAutor').value
    const msg = document.getElementById('inputMsg').value
    const name = document.getElementById('inputName').value
    const lastname = document.getElementById('inputLastname').value
    const age = document.getElementById('inputAge').value
    const alias = document.getElementById('inputAlias').value
    const avatar = document.getElementById('inputAvatar').value
    const nowDate = new Date()
    const id = crypto.randomUUID()
    const date = nowDate.getFullYear() + "-" + nowDate.getDate() + "-" + (nowDate.getMonth() + 1) + " " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds()
    //console.log(date)
    if (!email) {
        console.log("email no ingresado")
        return;
    }
    const msgToSend = {
        author: {email, name, lastname, age, alias, avatar},
        text: msg,
        date: date,
        id: id,
    }
    document.getElementById('inputMsg').value = "";
    socket.emit('message', msgToSend)
})

async function showMessages(messages) {
    const divMessages = document.getElementById('messages')
    console.log(messages)
    divMessages.innerHTML = await buildTemplate('templates/chat.hbs', {messages});
}

function showCompressPercentage(normalized, original) {
    const longN = JSON.stringify(normalized).length
    const longD = JSON.stringify(original).length
    const percentage = (longN * 100) / longD
    const text = "Compresion del " + percentage.toFixed(2) + '%'
    const percentageH2 = document.getElementById('percentage')
    percentageH2.innerText = text
}

async function buildTemplate(url, data) {
    const template = await fetchTemplate(url);
    const htmlGenerator = Handlebars.compile(template);
    return htmlGenerator(data)
}

function fetchTemplate(url) {
    return fetch(url).then(res => res.text())
}