const { Application } = require("./app/server");
const { PORT } = require("./app/utils/constants.utils");

new Application(PORT , "mongodb://127.0.0.1:27017/OnlineShop");