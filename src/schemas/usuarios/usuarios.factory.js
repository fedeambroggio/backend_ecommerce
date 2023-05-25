import { DATABASE_TYPE } from "../../../config/index.js";
import { UsuariosMongoDAO } from "../DAOs/usuarios.mongo.dao.js";

class UsuariosFactory {
    constructor() {
        this.usuariosDAO = null;
    }

    static getInstance() {
        if (!UsuariosFactory.instance) {
          UsuariosFactory.instance = new UsuariosFactory();
        }
        return UsuariosFactory.instance;
    }

    getDAO() {
        if (!this.usuariosDAO) {
          switch(DATABASE_TYPE) {
            case "MONGO":
              this.usuariosDAO = new UsuariosMongoDAO();
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
        return this.usuariosDAO;
    }
}

export default UsuariosFactory.getInstance();