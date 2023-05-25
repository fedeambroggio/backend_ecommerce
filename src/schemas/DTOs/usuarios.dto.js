export class UsuariosDTO {
    constructor(_id, _email, _password) {
      this.id = _id;
      this.email = _email;
      this.password = _password;
    }
}

export class InputUsuariosDTO {
    constructor(_email, _password) {
        this.email = _email;
        this.password = _password;
    }
}