import express from "express";
import cors from "cors";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT; // Loaded from .env file
        this.paths = {
            index: "/",
            homepage: "/api",
            images: "/api/images",
        };

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors()); // Enable CORS
    }

    // Bind controllers to routes
    routes() {
        this.app.use(this.paths.index, require("../routes/index"));
        this.app.use(this.paths.homepage, require("../routes/index"));
        this.app.use(this.paths.images, require("../routes/images"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on http://localhost:${process.env.PORT}`);
        });
    }
}

module.exports = Server;