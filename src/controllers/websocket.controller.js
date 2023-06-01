import { Server as SocketIOServer } from "socket.io";
import { addMessageNoHTTP, getAllMessages } from "./mensajes.controller.js";
import { logger } from "../utils/logger.js";

const initializeChatSocket = (server) => {
    // Inicializar Socket.IO
    const io = new SocketIOServer(server);
    
    // Eventos de Socket.IO
    io.on("connect", () => {
        logger.log({ level: "info", message: "Socket conectado" })
    });

    io.on("error", (error) => {
        logger.log({ level: "error", message: `Error al conectar con el socket: ${error}` })
    });

    
    io.on("connection", async (socket) => {
        logger.log({ level: "info", message: "Usuario conectado" })

        try {
            const response = await getAllMessages();
            const mensajes = response.data;

            socket.emit("all messages", mensajes);
        } catch (error) {
            logger.log({ level: "error", message: `Error al obtener los mensajes: ${error}` })
        }

        // Eventos de chat
        socket.on("chat message", async (message) => {
            logger.log({ level: "info", message: `Mensaje recibido de: ${message.email}` })
            try {
                await addMessageNoHTTP(message.email, message.cuerpo);

                // Emitir mensaje a todos los clientes conectados
                io.emit("chat message", message);
            } catch (error) {
                logger.log({ level: "error", message: `Error al guardar el mensaje: ${error}` })
            }
        });

        socket.on("disconnect", () => {
            logger.log({ level: "info", message: "Usuario desconectado" })
        });
    });
};

export { initializeChatSocket };
