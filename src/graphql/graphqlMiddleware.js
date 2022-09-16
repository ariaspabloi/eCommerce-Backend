import {buildSchema} from 'graphql'
import {graphqlHTTP} from 'express-graphql'
import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./productGraphqlController.js";

const schema = buildSchema(`
  input ProductInput {
    name: String
    description: String
    price: Int
    image: String
  }
  type Product {
    id: ID!
    name: String
    description: String
    price: Int
    image: String
  }
  type Query {
    getProduct(id: ID!): Product
    getProducts(field: String, value: String): [Product]
  }
  
  type Mutation {
    createProduct(data: ProductInput!): Product
    updateProduct(id: ID!, data: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`)
export const graphqlMiddleware = graphqlHTTP({
    schema,
    rootValue: {
        getProduct,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    },
    graphiql: true,
})