import { DATABASE_TYPE } from "../../../config/index.js";
import { OrdenesMongoDAO } from "../DAOs/ordenes.mongo.dao.js";

class OrdenesFactory {
    constructor() {
        this.ordenesDAO = null;
    }

    static getInstance() {
        if (!OrdenesFactory.instance) {
          OrdenesFactory.instance = new OrdenesFactory();
        }
        return OrdenesFactory.instance;
    }

    getDAO() {
        if (!this.ordenesDAO) {
          switch(DATABASE_TYPE) {
            case "MONGO":
              this.ordenesDAO = new OrdenesMongoDAO();
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
        return this.ordenesDAO;
    }
}

export default OrdenesFactory.getInstance();