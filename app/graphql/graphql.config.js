const { graphQLSchema } = require("./index.resolver");

const graphQLConfig = (req , res) => ({
    schema : graphQLSchema,
    graphiql : true,
    context : {req , res}

})

module.exports = {
    graphQLConfig,
}