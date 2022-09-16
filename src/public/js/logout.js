
showBye()

async function showBye() {
    const h1Bye = document.getElementById('byeText')
    const user = (await axios.get('/logininfo')).data.user
    if (user) {
        h1Bye.innerHTML = `Adios ${user}!`

    } else {
        h1Bye.innerHTML = `No estas logeado tonto!`
    }
    setTimeout(() => window.location.replace("logout"), 2000);
}