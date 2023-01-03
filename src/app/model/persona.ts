export interface IPersona {
    id?: number;
    perNombre?: String;
    perApellido?: String;
    perFechaNacimiento?: Date;
    perTipoDocumento?: String;
    perNumeroDocumento?: number


}
export class Persona implements IPersona {
    constructor(public id?: number,
        public perFechaNacimiento?: Date,
        public perNombre?: String,
        public perApellido?: String,
        public perTipoDocumento?: String,
        public perNumeroDocumento?: number ) {}
  }