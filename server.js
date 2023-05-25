import express from 'express';
import * as dotenv from 'dotenv'
import compression from 'compression';
import { logger } from './src/utils/logger.js';
import {SERVER_MODE, PORT} from './config/index.js'
import connectDatabase from "./src/database/index.js";

/* import expressSession from 'express-session';
import passport from 'passport';
import {initPassport} from "./middleware/passport.js";
import cluster from 'cluster';

import authRouter from "./routes/auth.routes.js";
import appRouter from "./routes/app.routes.js";
import apiRouter from "./routes/api.routes.js";
import sessionRouter from "./routes/session.routes.js";
import mensajesRouter from "./routes/mensajes.routes.js"; */


import productosRoutes from "./src/routes/productos.routes.js";
import carritosRoutes from "./src/routes/carritos.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config()

const startServer = () => {
    const app = express();
    logger.log({ level: "info", message: `Worker ${process.pid} started` });
    
    // Initialize mongodb
    connectDatabase();

    // Initialize Passport
    // initPassport(passport);

    // Server config
    app.use(express.json()); //To support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true })); //To support URL-encoded bodies
    app.use(compression()); //To compress all responses
    app.use(express.static("/public"));
/*     app.use(expressSession({
        secret: "secret-session",
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); */

    app.use((req, res, next) => {
        logger.log({level: "info", message: `Received ${req.method} request to ${req.path}`})
        next();
    });

    //Routes
    app.use("/productos", productosRoutes);
    app.use("/carrito", carritosRoutes);
    app.use("/", authRoutes);

    const server = app.listen(PORT, () => {
        logger.log("info", `App listening on port ${PORT}`);
    });
    server.on("error", (err) => {
        logger.log("error", `Error al iniciar el servidor ${err}`);
    });
};

if (SERVER_MODE === "CLUSTER") {
    if (cluster.isMaster) {
        logger.log({
            level: "info",
            message: `Master is running on ${process.pid}`,
        });

        for (let i = 0; i < numCPUs - 1; i++) {
            cluster.fork();
        }

        cluster.on("online", (worker) => {
            logger.log({
                level: "info",
                message: "Worker " + worker.process.pid + " is online",
            });
        });
        cluster.on("exit", (worker) => {
            logger.log({
                level: "info",
                message: `Worker ${worker.process.pid} died. Restarting...`,
            });
            cluster.fork();
        });
    } else {
        startServer();
    }
} else {
    startServer();
}

export { startServer };