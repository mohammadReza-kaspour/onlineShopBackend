const { graphqlHTTP } = require("express-graphql");
const { checkAccessTokenToLoggin, checkRole } = require("../http/middlewares/public.middleware");
const { ROLES } = require("../utils/constants.utils");
const { adminAllRoutes } = require("./admin/index.router.admin");
const { apiAllRoutes } = require("./api/index.router.api");
const { userAllRoutes } = require("./user/index.router.user");
const { graphQLConfig } = require("../graphql/graphql.config");

const router = require("express").Router();

router.use("/" , apiAllRoutes);
router.use("/user" , userAllRoutes);
router.use("/admin" , checkAccessTokenToLoggin , adminAllRoutes);
router.use("/graphql" , graphqlHTTP(graphQLConfig));

module.exports = {
    allRoutes : router,
}