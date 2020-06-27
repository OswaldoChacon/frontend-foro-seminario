import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Linea } from 'src/app/modelos/linea.model';


@Injectable({
  providedIn: 'root'
})
export class LineaService  {
  API_URL = "http://localhost:8000/api";    
  constructor(private http: HttpClient) { }
  

  cargarLineas():  Observable<Linea[]> 
  {
    return this.http.get<Linea[]>(`/api/lineas`);
  }  
  guardarLinea(linea:Linea)
  {
    return this.http.post(`/api/registrar_linea`,linea);
  }
  actualizarLinea(claveLinea: string, linea: Linea){
    return this.http.put(`${this.API_URL}/actualizar_linea/${claveLinea}`,linea);
  }
  eliminarLinea(linea_id : string)
  {
    return this.http.delete(`${this.API_URL}/eliminar_linea/${linea_id}`);
  }
}




