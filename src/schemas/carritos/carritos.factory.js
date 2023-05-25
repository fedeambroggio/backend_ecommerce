import { DATABASE_TYPE } from "../../../config/index.js";
import { CarritosMongoDAO } from "../DAOs/carritos.mongo.dao.js";

class CarritosFactory {
    constructor() {
        this.carritosDAO = null;
    }

    static getInstance() {
        if (!CarritosFactory.instance) {
          CarritosFactory.instance = new CarritosFactory();
        }
        return CarritosFactory.instance;
    }

    getDAO() {
        if (!this.carritosDAO) {
          switch(DATABASE_TYPE) {
            case "MONGO":
              this.carritosDAO = new CarritosMongoDAO();
              break;
            case "MYSQL":
              break;
            case "POSTGRES":
              break;
            case "FIREBASE":
              break;
            case "SQLITE":
              break;
            default:
              throw new Error("No se ha definido un tipo de base de datos incluida en el proyecto");
          }
        }
        return this.carritosDAO;
    }
}

export default CarritosFactory.getInstance();