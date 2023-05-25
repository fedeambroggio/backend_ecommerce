export class CarritosDTO {
    constructor(_id, _email, _items, _direccion, _fecha) {
      this.id = _id;
      this.email = _email;
      this.items = _items;
      this.direccion = _direccion;
      this.fecha = _fecha;
    }
}

export class InputCarritosDTO {
    constructor(_email, _items, _direccion, _fecha) {
        this.email = _email;
        this.items = _items;
        this.direccion = _direccion;
        this.fecha = _fecha;
    }
}