const { graphQLSchema } = require("./index.graphql");

const graphQLConfig = (req , res) => ({
    schema : graphQLSchema,
    graphiql : true,
    context : {req , res}

})

module.exports = {
    graphQLConfig, 
}