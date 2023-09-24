const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields : {

    }
})

const rootMutation = new GraphQLObjectType({
    name : "rootMutation",
    fields : {

    }
})

const graphQLSchema = new GraphQLSchema({
    query : rootQuery,
    mutation : rootMutation
})

module.exports = {
    graphQLSchema,
}