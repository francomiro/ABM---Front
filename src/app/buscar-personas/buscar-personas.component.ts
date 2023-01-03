import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Persona } from '../model/persona';
import { TipoDocumento } from '../model/tipo-documento';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-buscar-personas',
  templateUrl: './buscar-personas.component.html',
  styleUrls: ['./buscar-personas.component.css']
})
export class BuscarPersonasComponent implements OnInit{

  persona:Persona;
  todasLasPersonas:Persona[] = [];
  modalAbierto = false;

  errorMsg: Boolean = false;
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Fecha de Nacimiento', 'Tipo Documento', 'Numero Documento', 'Editar','Borrar'];
  
  personas: Persona[] = [];
  dataSource = new MatTableDataSource<Persona>([]);

  // dataSource = new MatTableDataSource(this.personas);
  @ViewChild(MatTable, {static: true}) table: MatTable<any> | undefined;

  public valor: string = "";
  public tipoDocumentoSeleccionado: string = "";
  public nombreSeleccionado: string ="";

  tipoDocs: TipoDocumento[] = [
    {valor: '', visual:'Todos'},
    {valor: 'DNI' , visual:'DNI'},
    {valor: 'PASAPORTE', visual:'Pasaporte'},
    {valor: 'CEDULA', visual:'Cedula'},
  ];

  constructor(private personaService: PersonaService){
    this.cargarTodasLasPersonas();
    this.persona = new Persona();
  }

  ngOnInit(): void {

    this.errorMsg = false;  
  }

  cargarTodasLasPersonas(){

    this.personaService.listaDePersonas().subscribe(response => {
      console.info(response);
      this.todasLasPersonas = response;
    })

  }
  public buscarPersona(){
    this.errorMsg = false
    this.personaService.busquedaDePersonas(this.nombreSeleccionado,this.tipoDocumentoSeleccionado).subscribe(response => {
      console.info(response);
      this.personas = response;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.info(this.dataSource.filter);
  }

  mostrarResultados() {
   if(this.personas.length > 0){
      this.errorMsg = false;
      return true;
   }else {
      this.errorMsg = true;
      return false;
   }
  }

  public openFormEditPersona(id:number){
    let personaAEdit = this.personas.find(persona => persona.id === id);
    if(personaAEdit != undefined){
      this.persona = personaAEdit;
      this.modalAbierto = true;
    }
    
  }

  public editarPersona(){

    this.personaService.editarPersona(this.persona).subscribe(response => {
    })
    setInterval(() => {
      window.location.reload();
   }, 500)

  }
  public borrarPersona(id: number){
    let resultado = "";
    this.personaService.borrarPersona(id).subscribe(response => {
      console.info(response);
      resultado = response;
    })
    setInterval(() => {
      window.location.reload();
   }, 500)
  }
  

}
