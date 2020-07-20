import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Linea } from 'src/app/modelos/linea.model';


@Injectable({
  providedIn: 'root'
})
export class LineaService {
  constructor(private http: HttpClient) { }


  getLineas(url: string) {
    return this.http.get<Linea[]>(`/api/${url}`);
  }
  guardarLinea(linea: Linea, url: string) {
    return this.http.post(`/api/registrar_${url}`, linea);
  }
  actualizarLinea(claveLinea: string, linea: Linea, url: string) {
    return this.http.put(`api/actualizar_${url}/${claveLinea}`, linea);
  }
  eliminarLinea(linea_id: string,url:string) {
    return this.http.delete(`api/eliminar_${url}/${linea_id}`);
  }
}




