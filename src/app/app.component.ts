import { Component } from '@angular/core';
import { Persona } from './model/persona';
import { PersonaService } from './service/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABM - Personas';
  modalAbierto = false;
  persona: Persona;

  constructor(private personaService:PersonaService, public dialog:MatDialog){
    this.persona = new Persona();

  }
  public createPersona(){

    this.personaService.createPersona(this.persona).subscribe(response => {
    console.info(response);
  })
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  openDialog():void{
    const dialogRef = this.dialog.open(PopupComponent,{});
    dialogRef.afterClosed().subscribe(res => {console.log(res)});
  }


}
