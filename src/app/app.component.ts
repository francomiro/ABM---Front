import { Component } from '@angular/core';
import { Persona } from './model/persona';
import { PersonaService } from './service/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABM - Personas';
  modalAbierto = false;
  persona: Persona;

  constructor(private personaService:PersonaService){
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
}
