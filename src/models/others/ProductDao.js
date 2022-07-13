const { knex } = require('knex')

class ProductDao {
    constructor(config) {
        this.knex = knex(config)
    }

    createTable(){
        return this.knex.schema.hasTable('products').then( (exists) => {
            if(!exists) {
                return this.knex.schema.createTable('products', table => {
                    table.integer('id').primary();
                    table.string('title', 20).notNullable();
                    table.integer('price').notNullable();
                    table.string('thumbnail',50).notNullable();
                  })
            }
        })
    }
   

    async save(object) {
        object.id = `${Date.now()}`;
        try {
            return this.knex('products').insert(object)
        } catch (error) {
            throw new Error(`Error en guardar objeto de id ${object.id}, ${error.message}`);
        }
    }

    async update(object, id) {
        try{
            return this.knex('products').where('id', '=',id).update(object)
        } catch (error) {
            throw new Error(`Error en actualizar objeto de id ${object.id}, ${error.message}`);
        }

    }

    async getById(id) {
        try{
            return this.knex('products').select('*').where('id', '=',id)
        } catch (error) {
            throw new Error(`Error en recoger objeto de id ${object.id}, ${error.message}`);
        }
    }

    async getAll() {
        try{
            return this.knex('products').select('*')
        } catch (error) {
            throw new Error(`Error en leer todos los productos, ${error.message}`);
        }
    }

    async deleteById(id) {
        try{
            return this.knex('products').where('id', '=',id).del()
        } catch (error) {
            throw new Error(`Error en recoger objeto de id ${object.id}, ${error.message}`);
        }
    }

    async deleteAll() {
        try{
            return this.knex('products').del()
        } catch (error) {
            throw new Error(`Error en recoger objeto de id ${object.id}, ${error.message}`);
        }
    }
}

module.exports = { ProductDao };