import { createTransport } from 'nodemailer';
import { logger } from '../utils/logger.js';
import { SMTP_HOST, SMTP_PASSWORD, SMTP_USER, SMTP_PORT } from '../../config/index.js';


const transporter = createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD
  }
});

const sendEmail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    logger.log({ level: "info", message: `Email sent: ${info.accepted}` });
  } catch (err) {
    logger.log({ level: "warn", message: `Error while sending email: ${err}` });
  }
}

export { sendEmail }