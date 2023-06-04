import dotenv from "dotenv"
import yargs from 'yargs'
dotenv.config()

const args = yargs(process.argv.slice(2)).argv;

//SERVER
export const PORT = process.env.PORT || 8080;
export const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
export const SERVER_MODE = args['mode'] || "FORK"; 

//DATABASE
export const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/Ecommerce";
// export const DATABASE_TYPE = process.env.DATABASE_TYPE || "MONGO"; //Determine DAO from env
export const DATABASE_TYPE = args['db'] || "MONGO"; //Determine DAO from CLI args

//SESSION
export const SESSION_LENGTH_MINUTES = args['session-length'] || 10; 
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

//Email config
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;