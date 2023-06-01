export class UsuariosDTO {
    constructor(_id, _email, _password, _name, _phone) {
      this.id = _id;
      this.email = _email;
      this.password = _password;
      this.name = _name;
      this.phone = _phone;
    }
}

export class InputUsuariosDTO {
    constructor(_email, _password, _name, _phone) {
        this.email = _email;
        this.password = _password;
        this.name = _name;
        this.phone = _phone;
    }
}