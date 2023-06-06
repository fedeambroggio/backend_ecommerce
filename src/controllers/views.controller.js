import { logger } from '../utils/logger.js'
import {
    PORT,
    ADMIN_EMAIL,
    BASE_URL,
    DATABASE_TYPE,
    MONGO_URI,
    SERVER_MODE,
    SESSION_LENGTH_MINUTES,
    SMTP_HOST,
    SMTP_PASSWORD,
    SMTP_PORT,
    SMTP_USER,
    TOKEN_SECRET,
    VIEW_ENGINE
} from '../../config/index.js'; 

export const showConfiguration = async (req, res) => {
    try {
        res.render(`${VIEW_ENGINE.toLowerCase()}/configuration`, {
            port: PORT,
            baseUrl: BASE_URL,
            serverMode: SERVER_MODE,
            mongoUri: MONGO_URI,
            databaseType: DATABASE_TYPE,
            sessionLengthMinutes: SESSION_LENGTH_MINUTES,
            tokenSecret: TOKEN_SECRET,
            smtpHost: SMTP_HOST,
            smtpPort: SMTP_PORT,
            smtpUser: SMTP_USER,
            smtpPassword: SMTP_PASSWORD,
            adminEmail: ADMIN_EMAIL,
        });
    } catch (err) {
        logger.log({ level: "warn", message: `La vista de configuración no ha podido ser renderizada: ${err}` });
        return res.status(500).json({
            message: `La vista de configuración no ha podido ser renderizada: ${err}`,
        });
    }
};

export const showChat = async (req, res) => {
    try {
        res.render(`${VIEW_ENGINE.toLowerCase()}/chat`, { mensajes: []});
    } catch (err) {
        logger.log({ level: "warn", message: `La vista de chat no ha podido ser renderizada: ${err}` });
        return res.status(500).json({
            message: `La vista de chat no ha podido ser renderizada: ${err}`,
        });
    }
};

export const showIndex = async (req, res) => {
    try {
        res.render(`${VIEW_ENGINE.toLowerCase()}/index`);
    } catch (err) {
        logger.log({ level: "warn", message: `La vista index no ha podido ser renderizada: ${err}` });
        return res.status(500).json({
            message: `La vista index no ha podido ser renderizada: ${err}`,
        });
    }
};

