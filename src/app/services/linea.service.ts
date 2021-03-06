import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Linea } from 'src/app/modelos/linea.model';
import { FormErrorService } from './form-error.service';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class LineaService {
  constructor(private http: HttpClient,
    private _formError: FormErrorService
  ) { }


  getLineas(url: string) {
    return this.http.get<Linea[]>(`/api/${url}`);
  }

  guardarLinea(linea: FormGroup, url: string) {
    return this.http.post(`/api/${url}`, linea.value).pipe(
      catchError(error=>{
        return this._formError.handleError(error,linea);
      })
    );
  }
  
  actualizarLinea(clave: string, linea: FormGroup, url: string) {
    return this.http.put(`api/${url}/${clave}`, linea.value).pipe(
      catchError(error=>{
        return this._formError.handleError(error,linea);
      })
    );
  }
  
  eliminarLinea(clave: string, url: string) {
    return this.http.delete(`api/${url}/${clave}`);
  }
}




