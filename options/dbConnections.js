const mysql = {
    client: 'mysql',
    connection: {
        user: 'root',
        password: 'backendCH!',
        host: 'localhost',
        database: 'backendch'
    }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: "./persistence/db.sqlite"
    },
    useNullAsDefault: true
}
      

module.exports = { mysql, sqlite3 }