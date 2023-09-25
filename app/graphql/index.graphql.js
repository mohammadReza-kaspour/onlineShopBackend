const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blogs.graphql.resolver");
const { productResolver } = require("./queries/products.graphql.resolver");

const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields : {
        blogs : blogResolver,
        products : productResolver,
    }
})

const rootMutation = new GraphQLObjectType({
    name : "rootMutation",
    fields : {

    }
})

const graphQLSchema = new GraphQLSchema({
    query : rootQuery,
    // mutation : rootMutation
})

module.exports = {
    graphQLSchema,
}