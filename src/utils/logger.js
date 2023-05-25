import * as winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, '../../info');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ), 
    level: 'info', //Log only if info.level is less than or equal to this level
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: path.join(logDirectory, 'warn.log'), level: 'warn' }),
        new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    ],
});

export { logger };

// const levels = {
//     error: 0,
//     warn: 1,s
//     info: 2,
//     http: 3,s
//     verbose: 4,
//     debug: 5,
//     silly: 6
// };