import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Persona } from '../model/persona';
import { TipoDocumento } from '../model/tipo-documento';
import { PersonaService } from '../service/persona.service';
import { PopupEditComponent } from '../popup-edit/popup-edit.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-buscar-personas',
  templateUrl: './buscar-personas.component.html',
  styleUrls: ['./buscar-personas.component.css']
})
export class BuscarPersonasComponent implements OnInit{

  persona:Persona;
  todasLasPersonas:Persona[] = [];
  busquedaRealizada:Boolean = false;
  errorMsg: Boolean = false;
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Fecha de Nacimiento', 'Tipo Documento', 'Numero Documento', 'Editar','Borrar'];
  formattedDate: string = "";
  valor: string = "";
  tipoDocumentoSeleccionado: string = "";
  nombreSeleccionado: string ="";
  personas: Persona[] = [];
  dataSource = new MatTableDataSource<Persona>([]);

  @ViewChild(MatTable, {static: true}) table: MatTable<any> | undefined;

  tipoDocs: TipoDocumento[] = [
    {valor: '', visual:'Todos'},
    {valor: 'DNI' , visual:'DNI'},
    {valor: 'PASAPORTE', visual:'Pasaporte'},
    {valor: 'CEDULA', visual:'Cedula'},
  ];

  constructor(public dialog:MatDialog,private personaService: PersonaService,public datePipe: DatePipe){
    this.cargarTodasLasPersonas();
    this.persona = new Persona();
    this.datePipe = datePipe;
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
      this.busquedaRealizada = true;
    })
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
      const dialogRef = this.dialog.open(PopupEditComponent,{data:{persona:this.persona}});
      dialogRef.afterClosed().subscribe(res => {console.log(res)});
    }
    
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
