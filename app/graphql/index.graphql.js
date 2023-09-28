const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blogs.graphql.resolver");
const { productResolver } = require("./queries/products.graphql.resolver");
const { categoryResolver } = require("./queries/categories.graphql.resolver");
const { courseResolver } = require("./queries/courses.graphql.resolver");
const { createCommentForBlogResolver, createCommentForProductResolver, createCommentForCourseResolver } = require("./mutations/comments.graphql.resolver");
const { likesOrDislikesForBlogResolver, likesOrDislikesForProductResolver, likesOrDislikesForCourseResolver } = require("./mutations/likesOrDislikes.graphql.resolver");
const { bookmarkForBlogResolver, bookmarkForProductResolver, bookmarkForCourseResolver } = require("./mutations/bookmarks.graphql.resolver");
const { userWishListResolver } = require("./queries/userWishlist.graphql.resolver");
const { AddToBasketResolver, removeFromBasketResolver } = require("./mutations/basket.graphql.resolver");

const rootQuery = new GraphQLObjectType({
    name : "rootQuery",
    fields : {
        blogs : blogResolver,
        products : productResolver,
        categories : categoryResolver,
        courses : courseResolver,
        wishList : userWishListResolver,
    }
})

const rootMutation = new GraphQLObjectType({
    name : "rootMutation",
    fields : {
        createCommentForBlog : createCommentForBlogResolver,
        createCommentForProduct : createCommentForProductResolver,
        createCommentForCourse : createCommentForCourseResolver,

        likeOrDislikeForBlog : likesOrDislikesForBlogResolver,
        likeOrDislikeForProduct : likesOrDislikesForProductResolver,
        likeOrDislikeForCourse : likesOrDislikesForCourseResolver,

        bookmarkForBlog : bookmarkForBlogResolver,
        bookmarkForProduct : bookmarkForProductResolver,
        bookmarkForCourse : bookmarkForCourseResolver,

        AddToBasket : AddToBasketResolver,
        removeFromBasket : removeFromBasketResolver,
    }
})

const graphQLSchema = new GraphQLSchema({
    query : rootQuery,
    mutation : rootMutation
})

module.exports = {
    graphQLSchema,
}