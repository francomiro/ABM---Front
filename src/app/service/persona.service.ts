import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  //URL BACKEND
  private urlBase = 'http://localhost:8080/person/'


  constructor(private httpClient : HttpClient) { }

  //Obtiene todas las personas
  listaDePersonas():Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(`${this.urlBase}`);
  }

  //Obtiene las personas filtradas
  busquedaDePersonas(nombre:string,tipoDoc:string):Observable<Persona[]>{
    const params = new HttpParams()
    .set('name', nombre)
    .set('docType', tipoDoc);
    
  return this.httpClient.get<Persona[]>(this.urlBase + 'find/', { params });
  }

  borrarPersona(id:number):Observable<string>{
  return this.httpClient.delete<string>(this.urlBase + id);
  }

  createPersona(persona:Persona):Observable<string>{
    const request = {
      perApellido: persona.perApellido,
      perNombre: persona.perNombre,
      perTipoDocumento: persona.perTipoDocumento,
      perNumeroDocumento: persona.perNumeroDocumento,
      perFechaNacimiento: persona.perFechaNacimiento 
    };

    return this.httpClient.post<string>(this.urlBase, request );
  }

  editarPersona(persona:Persona):Observable<string>{
    const request = {
      id:persona.id,
      perApellido: persona.perApellido,
      perNombre: persona.perNombre,
      perTipoDocumento: persona.perTipoDocumento,
      perNumeroDocumento: persona.perNumeroDocumento,
      perFechaNacimiento: persona.perFechaNacimiento 
    };

    return this.httpClient.put<string>(this.urlBase, request);
  }
}
