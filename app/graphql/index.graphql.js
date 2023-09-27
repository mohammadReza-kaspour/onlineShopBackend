const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blogs.graphql.resolver");
const { productResolver } = require("./queries/products.graphql.resolver");
const { categoryResolver } = require("./queries/categories.graphql.resolver");
const { courseResolver } = require("./queries/courses.graphql.resolver");
const { createCommentForBlogResolver, createCommentForProductResolver, createCommentForCourseResolver } = require("./queries/comments.graphql.resolver");

const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields : {
        blogs : blogResolver,
        products : productResolver,
        categories : categoryResolver,
        courses : courseResolver,
    }
})

const rootMutation = new GraphQLObjectType({
    name : "rootMutation",
    fields : {
        createCommentForBlog : createCommentForBlogResolver,
        createCommentForProduct : createCommentForProductResolver,
        createCommentForCourse : createCommentForCourseResolver,
    }
})

const graphQLSchema = new GraphQLSchema({
    query : rootQuery,
    mutation : rootMutation
})

module.exports = {
    graphQLSchema,
}