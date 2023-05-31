export class MensajesDTO {
    constructor(_id, _email, _tipo, _fecha, _cuerpo) {
        this.id = _id;
        this.email = _email;
        this.tipo = _tipo;
        this.fecha = _fecha;
        this.cuerpo = _cuerpo;
    }
}

export class InputMensajesDTO {
    constructor(_email, _tipo, _fecha, _cuerpo) {
        this.email = _email;
        this.tipo = _tipo;
        this.fecha = _fecha;
        this.cuerpo = _cuerpo;
    }
}
