const { knex } = require('knex')
class MessageDao {
    constructor(config) {
        this.knex = knex(config)
    }

    createTable(){
        return this.knex.schema.hasTable('messages').then( (exists) => {
            if(!exists) {
                return this.knex.schema.createTable('messages', table => {
                    table.increments('id').primary();
                    table.string('autor', 20).notNullable();
                    table.string('msg', 50).notNullable();
                    table.datetime('date').notNullable();
                  })
            }
        })
    }
   
    save(msg){
        return this.knex('messages').insert(msg)
    }

    getAll() {
        return this.knex('messages').select('*')
    }

    close() {
        this.knex.destroy();
    }
}

module.exports = { MessageDao };