class HomeController{
    indexPage = async (req , res , next) => {
        res.status(200).send("Online Shop Backend")
    }
}

module.exports = {
    HomeController : new HomeController(),
}