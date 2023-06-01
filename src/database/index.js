import mongoose from "mongoose";
import { MONGO_URI } from "../../config/index.js";
import { logger } from "../utils/logger.js";

async function init() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URI);
}


export default () => init().catch(err => logger.log("error", `Error al conectar con mongo: ${err}`));