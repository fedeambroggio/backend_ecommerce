import dotenv from "dotenv";
dotenv.config();

//SERVER
const PORT = process.env.PORT || 80;
const BASE_URL = process.env.BASE_URL;
const SERVER_MODE = process.env.SERVER_MODE || "CLUSTER";
const VIEW_ENGINE = process.env.VIEW_ENGINE || "EJS";

//DATABASE
const MONGO_URI = process.env.MONGO_URL;
const DATABASE_TYPE = process.env.DATABASE_TYPE || "MONGO";

//SESSION
const SESSION_LENGTH_MINUTES = process.env.SESSION_LENGTH_MINUTES || 15;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

//Email config
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default {
    // Opciones de configuración para producción
    PORT: PORT,
    BASE_URL: BASE_URL,
    SERVER_MODE: SERVER_MODE,
    VIEW_ENGINE: VIEW_ENGINE,
    MONGO_URI: MONGO_URI,
    DATABASE_TYPE: DATABASE_TYPE,
    SESSION_LENGTH_MINUTES: SESSION_LENGTH_MINUTES,
    TOKEN_SECRET: TOKEN_SECRET,
    SMTP_HOST: SMTP_HOST,
    SMTP_PORT: SMTP_PORT,
    SMTP_USER: SMTP_USER,
    SMTP_PASSWORD: SMTP_PASSWORD,
    ADMIN_EMAIL: ADMIN_EMAIL,
};
