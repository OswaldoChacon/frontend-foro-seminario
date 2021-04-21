import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Grupo } from 'src/app/modelos/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _notificacionesService: NotificacionesService,
    private _router: Router) { }

  getGrupos(id: number, pagina: number, nombre: string) {
    return this._http.get<Grupo[]>(`api/plantillas/${id}/grupos`, {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('nombre', nombre)
    });
  }

  guardarGrupos(form: FormGroup, plantilla: string) {
    return this._http.post(`api/plantillas/${plantilla}/grupos`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }



  actualizarGrupo(id: number, plantilla:string, form: FormGroup) {
    return this._http.put(
      `api/plantillas/${plantilla}/grupos/${id}`,
      form.value
    ).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }

  eliminarGrupo(id: number) {
    return this._http.delete(`api/plantillas/grupos/${id}`);
  }




}
