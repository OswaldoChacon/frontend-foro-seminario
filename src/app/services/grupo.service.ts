import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from './form-error.service';
import { NotificacionesService } from './notificaciones.service';
import { Grupo } from 'src/app/modelos/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private _http: HttpClient,
    private formError: FormErrorService,
    private notificacionesService: NotificacionesService,
    private router: Router) { }

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
        return this.formError.handleError(error, form);
      })
    );
  }



  actualizarGrupo(id: number, plantilla:string, form: FormGroup) {
    return this._http.put(
      `api/plantillas/${plantilla}/grupos/${id}`,
      form.value
    ).pipe(
      catchError(error => {
        return this.formError.handleError(error, form);
      })
    );
  }

  eliminarGrupo(id: number, plantilla:string) {
    return this._http.delete(`api/plantillas/${plantilla}/grupos/${id}`);
  }




}
