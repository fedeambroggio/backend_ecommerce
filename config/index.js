import dotenv from "dotenv";
import { logger } from "../src/utils/logger.js";
dotenv.config();


let config;

if (process.env.ENVIRONMENT === "production") {
    config = await import("./production.js").then((module) => module.default);
} else {
    config = await import("./development.js").then((module) => module.default);
}

logger.log({
    level: "info",
    message: `Running on ${process.env.ENVIRONMENT}`,
});

export const {
    PORT,
    BASE_URL,
    SERVER_MODE,
    VIEW_ENGINE,
    MONGO_URI,
    DATABASE_TYPE,
    SESSION_LENGTH_MINUTES,
    TOKEN_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    ADMIN_EMAIL,
} = config;
