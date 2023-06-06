import express from 'express';
import * as dotenv from 'dotenv'
import compression from 'compression';
import cluster from 'cluster';
import os from 'os';
import { logger } from './src/utils/logger.js';
import {SERVER_MODE, PORT, VIEW_ENGINE} from './config/index.js'
import connectDatabase from "./src/database/index.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { initializeChatSocket } from './src/controllers/websocket.controller.js';

import productosRoutes from "./src/routes/productos.routes.js";
import carritosRoutes from "./src/routes/carritos.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import mensajesRouter from './src/routes/mensajes.routes.js';
import ordenesRouter from './src/routes/ordenes.routes.js';
import viewsRouter from './src/routes/views.routes.js';

dotenv.config()

const startServer = () => {
    const app = express();
    logger.log({ level: "info", message: `Worker ${process.pid} started` });
    
    // Initialize mongodb
    connectDatabase();

    // Server config
    app.use(express.json()); //To support JSON-encoded bodies
    app.use(express.urlencoded({ extended: true })); //To support URL-encoded bodies
    app.use(compression()); //To compress all responses
    app.use(express.static("/public"));

    if (VIEW_ENGINE.toLowerCase() === 'pug') {
        // Configuración de Pug
        app.set('view engine', 'pug');
        app.set('views', path.join(__dirname, 'src/views'));
    } else { 
        // Configuración de EJS
        app.set("view engine", "ejs");
        app.set("views", path.join(__dirname, "src/views"));
    }

    //Informacion de la ruta solicitada
    app.use((req, res, next) => {
        logger.log({level: "info", message: `Received ${req.method} request to ${req.path}`})
        next();
    });

    //Routes
    app.use("/productos", productosRoutes);
    app.use("/carrito", carritosRoutes);
    app.use("/chat", mensajesRouter);
    app.use("/ordenes", ordenesRouter);
    app.use("/", viewsRouter);
    app.use("/", authRoutes);

    //Manejo de errores en cualquier endpoint
    app.use((err, req, res, next) => {
        res.status(500).render(`${VIEW_ENGINE.toLowerCase()}/error`, { error: err });
    });

    //Test websocket
    // app.get('/', (req, res) => {
    //     const filePath = path.join(__dirname, '/public/index.html');
    //     res.sendFile(filePath);
    // });

    const server = app.listen(PORT, () => {
        logger.log("info", `App listening on port ${PORT}`);
    });
    server.on("error", (err) => {
        logger.log("error", `Error al iniciar el servidor ${err}`);
    });

    // Initialize chat socket
    initializeChatSocket(server)
};

if (SERVER_MODE === "CLUSTER") {
    if (cluster.isMaster) {
        logger.log({
            level: "info",
            message: `Master is running on ${process.pid}`,
        });

        for (let i = 0; i < os.cpus().length - 1; i++) {
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