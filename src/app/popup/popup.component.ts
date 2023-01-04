import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Persona } from '../model/persona';
import { TipoDocumento } from '../model/tipo-documento';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{

  persona: Persona;

  constructor(private personaService:PersonaService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public message : string) {
      this.persona = new Persona();
      this.message = "Crear una persona nueva";
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

  public createPersona(){
    this.personaService.createPersona(this.persona).subscribe(response => {
    console.info(response);
  })
  setInterval(() => {
    window.location.reload();
  }, 500)
  }

}