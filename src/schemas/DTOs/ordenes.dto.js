export class OrdenesDTO {
    constructor(_id, _email, _items, _estado = 'generada') {
      this.id = _id;
      this.email = _email;
      this.items = _items;
      this.estado = _estado;
    }
}

export class InputOrdenesDTO {
    constructor(_email, _items, _estado = 'generada') {
        this.email = _email;
        this.items = _items;
        this.estado = _estado;
    }
}