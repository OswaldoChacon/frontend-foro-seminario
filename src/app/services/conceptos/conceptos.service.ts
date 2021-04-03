import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';
import { Concepto } from 'src/app/modelos/concepto.model';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  constructor(private _http: HttpClient,
    private _formError: FormErrorService) { }

    getConceptos(id : number, pagina: number, nombre: string){
            return this._http.get<Concepto[]>(`api/plantillas/grupos/conceptos/${id}`,{
              params: new HttpParams()
                .set('page', pagina.toString())
                .set('nombre', nombre)
            });
    }

    guardarPlantilla(form: FormGroup) {
      return this._http.post(`api/plantillas/grupos/conceptos`, form.value).pipe(
        catchError(error => {
          return this._formError.handleError(error, form);
        })
      );
    }
  


    actualizarPlantilla(id: number, form: FormGroup) {
      return this._http.put(
        `api/plantillas/grupos/conceptos/${id}`,
        form.value
      ).pipe(
        catchError(error => {
          return this._formError.handleError(error, form);
        })
      );
    }

    eliminarConcepto(id: number) {
      return this._http.delete(`api/plantillas/grupos/conceptos/${id}`);
    }

    
  

}
