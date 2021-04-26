import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { Plantilla } from 'src/app/modelos/Plantilla.model';

@Injectable({
  providedIn: 'root'
})
export class PlantillasService {

  constructor(private http: HttpClient,
    private formError: FormErrorService) { }

  getPlantillas(pagina: number, nombre: string) {
    return this.http.get<Plantilla[]>(`api/plantillas`, {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('nombre', nombre)
    });
  }

  guardarPlantilla(form: FormGroup) {
    return this.http.post(`api/plantillas`, form.value).pipe(
      catchError(error => {
        return this.formError.handleError(error, form);
      })
    );
  }

  actualizarPlantilla(id: number, form: FormGroup) {
    return this.http.put(
      `api/plantillas/${id}`,
      form.value
    ).pipe(
      catchError(error => {
        return this.formError.handleError(error, form);
      })
    );
  }

  eliminarPlantilla(id: number) {
    return this.http.delete(`api/plantillas/${id}`);
  }

  activarPlantilla(plantilla: Plantilla, activo:any) {
    console
    plantilla.activo = !plantilla.activo;
    return this.http.put(`api/plantillas/${plantilla.id}/activo`,{
      activo
    })
  }




}
