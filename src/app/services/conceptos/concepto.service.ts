import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';
import { Concepto } from 'src/app/modelos/concepto.model';
import { Router } from '@angular/router';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  constructor(private http: HttpClient,
    private formError: FormErrorService,
    private notificacionesService: NotificacionesService,
    private router: Router) { }

  getConceptos(id: number, pagina: number, nombre: string) {
    return this.http.get<Concepto[]>(`api/grupos/${id}/conceptos`, {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('nombre', nombre)
    });
  }

  guardarConcepto(form: FormGroup, grupo: string) {
    return this.http.post(`api/grupos/${grupo}/conceptos`, form.value).pipe(
      catchError(error => {
        return this.formError.handleError(error, form);
      })
    );
  }

  actualizarConcepto(id: number, form: FormGroup, grupo: string) {
    return this.http.put(
      `api/grupos/${grupo}/conceptos/${id}`,
      form.value
    ).pipe(
      catchError(error => {
        return this.formError.handleError(error, form);
      })
    );
  }

  eliminarConcepto(id: number) {
    return this.http.delete(`api/plantillas/grupos/conceptos/${id}`);
  }




}
