class AdminProductController {
    addProduct = async (req , res , next) => {
        try {
            console.log(req.body);
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "محصول شما با موفقیت اضافه شده",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editProduct = async (req , res , next) => {
        try {
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    removeProduct = async (req , res , next) => {
        try {
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getAllProducts = async (req , res , next) => {
        try {
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
    getProductByID = async (req , res , next) => {
        try {
            
            res.status(200).json({
                statusCode : res.statusCode,
                success : true,
                data : {
                    message : "hi",
                    data : {}
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminProductController : new AdminProductController()
}