export class ProductosDTO {
    constructor(_id, _foto, _descripcion, _precio, _categoria) {
      this.id = _id;
      this.foto = _foto;
      this.descripcion = _descripcion;
      this.precio = _precio;
      this.categoria = _categoria;
    }
}

export class InputProductosDTO {
    constructor(_foto, _descripcion, _precio, _categoria) {
      this.foto = _foto;
      this.descripcion = _descripcion;
      this.precio = _precio;
      this.categoria = _categoria;
    }
}