import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioJuradoService {

  constructor(private http: HttpClient) { }
  getJuraro(pagina: string){
    return this.http.get(`api/jurado`,{
      params: new HttpParams().set('page',pagina)
    });
  }
  agregarHorario(){

  }
  eliminarHorario(){

  }
}
