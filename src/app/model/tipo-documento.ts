export interface ITipoDocumento {
    valor?: String;
    visual?: String;


}


export class TipoDocumento implements ITipoDocumento {

    constructor(public valor?: String,public visual?: String) { }
}
