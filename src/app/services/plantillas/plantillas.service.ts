import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Plantilla } from 'src/app/modelos/Plantilla.model';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {

  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _notificacionesService: NotificacionesService,
    private _router: Router) { }

    getPlantillas(pagina: number, nombre: string){
            return this._http.get<Plantilla[]>(`api/plantillas`,{
              params: new HttpParams()
                .set('page', pagina.toString())
                .set('num_control', nombre)
            });
    }

    guardarPlantilla(form: FormGroup) {
      return this._http.post(`api/plantillas`, form.value).pipe(
        catchError(error => {
          return this._formError.handleError(error, form);
        })
      );
    }
  


    actualizarPlantilla(id: number, form: FormGroup) {
      return this._http.put(
        `api/plantillas/${id}`,
        form.value
      ).pipe(
        catchError(error => {
          return this._formError.handleError(error, form);
        })
      );
    }

    eliminarPlantilla(id: number) {
      return this._http.delete(`api/plantillas/${id}`);
    }

    
  

}
