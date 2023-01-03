import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Persona } from '../model/persona';
import { PopupComponent } from '../popup/popup.component';
import { PersonaService } from '../service/persona.service';

@Component({
  selector: 'app-popup-edit',
  templateUrl: './popup-edit.component.html',
  styleUrls: ['./popup-edit.component.css'],
  template: 'passed in {{ data.persona }}',
})
export class PopupEditComponent {

  // persona: Persona;
  todasLasPersonas:Persona[] = [];
  personas: Persona[] = [];


  constructor(private personaService:PersonaService,
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {persona:Persona}) {
      // this.persona = new Persona();
    
    }

  ngOnInit(): void {
    
  }

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
