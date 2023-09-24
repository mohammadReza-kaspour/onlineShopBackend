const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blogs.graphql.resolver");

const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields : {
        blogs : blogResolver
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