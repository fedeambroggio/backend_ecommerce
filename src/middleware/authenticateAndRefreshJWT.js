import jwt from "jsonwebtoken";
import { TOKEN_SECRET, SESSION_LENGTH_MINUTES } from "../../config/index.js";
import { logger } from "../utils/logger.js";

const PORCENTAJE_TIEMPO_RESTANTE_PARA_RENOVACION = 50;

const checkIfTokenNeedsToBeRefreshed = (user) => {
    // Comprobar el tiempo restante de expiración del token
    const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp actual en segundos
    const tokenExpirationTimestamp = user.exp;

    const timeRemaining = tokenExpirationTimestamp - currentTimestamp; // Tiempo restante en segundos
    if (timeRemaining < (SESSION_LENGTH_MINUTES * 60 * (PORCENTAJE_TIEMPO_RESTANTE_PARA_RENOVACION / 100))) {
        return true;
    } else {
        return false;
    }
};

// Middleware para verificar y renovar el token JWT
const authenticateAndRefreshJWT = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                logger.log({
                    level: "warn",
                    message: `Usuario no autenticado`,
                });
                return res.sendStatus(403); // Token inválido
            }

            if (checkIfTokenNeedsToBeRefreshed(user)) {
                // Renovar el token
                const newToken = jwt.sign(
                    { user_id: user.user_id, email: user.email },
                    TOKEN_SECRET,
                    { expiresIn: SESSION_LENGTH_MINUTES * 60 }
                );

                // Utilizar el nuevo token en la respuesta
                req.headers.authorization = newToken;
                res.setHeader("Authorization", newToken);
            }

            req.user = user;
            next();
        });
    } else {
        logger.log({
            level: "warn",
            message: `Usuario no autenticado`,
        });
        return res.sendStatus(401);
    }
};

export { authenticateAndRefreshJWT };
