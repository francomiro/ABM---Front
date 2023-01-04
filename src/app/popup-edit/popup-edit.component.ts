import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../model/persona';
import { TipoDocumento } from '../model/tipo-documento';
import { PopupComponent } from '../popup/popup.component';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css'],
  template: 'passed in {{ data.persona }}',
})
export class PopupEditComponent {

  todasLasPersonas:Persona[] = [];
  personas: Persona[] = [];


  constructor(private personaService:PersonaService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {persona:Persona}) {
    }

  ngOnInit(): void {
    
  }
  tipoDocs: TipoDocumento[] = [
    {valor: 'DNI' , visual:'DNI'},
    {valor: 'PASAPORTE', visual:'Pasaporte'},
    {valor: 'CEDULA', visual:'Cedula'},
  ];

  onNoClick():void{
    this.dialogRef.close();

  }

  public editarPersona(){
    this.personaService.editarPersona(this.data.persona).subscribe(response => {
    })
    setInterval(() => {
      window.location.reload();
   }, 500)
  }

}
