const {default:mongoose} = require("mongoose");
const { allRoutes } = require("./routers/index.router");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const { deleteJunkFilesAfterBreakUploading } = require("./utils/multer.utils");
const { MY_LONGTERM_TOKEN } = require("./utils/constants.utils");

class Application {
    #express = require("express");
    #app = this.#express();

    #DB_URI;
    #PORT;

    constructor(PORT , DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;

        this.configApplication();
        this.connectToMongoDB(DB_URI);
        this.configRedis();
        this.createServer(PORT);
        this.createRoutes();
        this.errorHandling();
    }
    configApplication = () => {
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({extended:true}));
        this.#app.use(this.#express.static("./public"));
        this.#app.use("/api-docs" , swaggerUI.serve , swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition : {
                openapi: "3.0.0",
                info : {
                    title : "Online Shop",
                    version : "1.0.0",
                    description : "بک اند فروشگاه آنلاین ",
                    contact : {
                        name : "mohammad reza kaspour",
                        url : "https://github.com/mohammadReza-kaspour",
                        email : "kaspourmohammad@gmail.com"
                    }
                },
                servers : [
                    {
                        url : `http://localhost:${this.#PORT}`
                    }
                ],
                components: {
                    securitySchemes : {
                        BearerAuth : {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security : [{BearerAuth : []}]
            },
            apis : ["./app/routers/*/*/*.js" , "./app/routers/*/*.js"]
        }),
            {explorer : true}
        ))
    }
    configRedis = async () => {
        const {redisClient} = require("./utils/initRedis.utils");
        await redisClient.connect();
    }
    createServer = (port) => {
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(port, () => {
            console.log(`server run on port ${this.#PORT} ==> http://localhost:${this.#PORT}`);
        });
    }
    connectToMongoDB = (uri) => {
        mongoose.connect(uri)
        .then(() => {
            console.log("connected to mongodb");
        })
        .catch((error) => {
            console.log("failed to connect to mongoDb" , error);
        });

        process.on("SIGINT" , async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    createRoutes = () => {
        this.#app.use(allRoutes)
    }
    errorHandling = () => {
        this.#app.use((req , res , next) => {
            next(createError.NotFound("Page Not Found"));
        });
        this.#app.use((error , req , res , next) => {
            const statusCode = error?.status ?? error?.statusCode ?? 500;
            const message = error?.msg ?? error?.message ?? "Internal Server Error"
            if(!!req.file) deleteJunkFilesAfterBreakUploading(req.file);
            if(!!req.files) deleteJunkFilesAfterBreakUploading(req.files);

            res.status(statusCode).json({
                statusCode : statusCode,
                success : false,
                data : {
                    message,
                }
            })
        });
    }
}

module.exports = {
    Application,
}