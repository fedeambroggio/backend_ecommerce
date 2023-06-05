import yargs from 'yargs'

const args = yargs(process.argv.slice(2)).argv;

const SERVER_PORT = args['port'] || 8080; 
const SERVER_MODE = args['mode'] || "FORK"; 
const VIEW_ENGINE = args['veng'] || "EJS"; 
const SMTP_USER = args['smtpu'] || "oral.romaguera@ethereal.email"; 
const SMTP_PASSWORD = args['smtpp'] || "3uU8kzHN8maDHwRuv4"; 
const ADMIN_EMAIL = args['smtpe'] || "fambroggio.polko@gmail.com"; 

export default {
    // Opciones de configuración para desarrollo
    PORT: SERVER_PORT,
    BASE_URL: "http://localhost:8080",
    SERVER_MODE: SERVER_MODE,
    VIEW_ENGINE: VIEW_ENGINE,
    MONGO_URI: "mongodb://localhost:27017/Ecommerce",
    DATABASE_TYPE: "MONGO",
    SESSION_LENGTH_MINUTES: 5,
    TOKEN_SECRET: "token_super_secret",
    SMTP_HOST: "smtp.ethereal.email",
    SMTP_PORT: 587,
    SMTP_USER: SMTP_USER,
    SMTP_PASSWORD: SMTP_PASSWORD,
    ADMIN_EMAIL: ADMIN_EMAIL,
  };