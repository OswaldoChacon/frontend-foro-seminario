import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { Proyecto } from "src/app/modelos/proyecto.model";
import { map, tap, finalize, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class NotificacionesService {
  cargando: boolean = true;
  totalNotificaciones = 0;
  notificaciones: any = {};
  // private rolActual = this._router.url.includes("Administrador") ? "Administrador" : this._router.url.includes("Alumno") ? "Alumno" : "Docente";
  constructor(private _http: HttpClient, private _router: Router) { }

  miSolicitud() {
    return this._http.get<{ data: any; proyecto: Proyecto; mensaje: string }>(`api/miSolicitud`);
  }

  misNotificaciones(no_foro: string = 'Foro en curso', respuesta: string = 'Pendientes', enviados: string = 'Recibidos') {
    const rolActual = this._router.url.includes("Administrador") ? "Administrador" : this._router.url.includes("Alumno") ? "Alumno" : "Docente";
    // return this._http.get(`api/misNotificaciones`);    
    let no_foro_split: string[];
    if (no_foro !== 'Foro en curso') {
      no_foro_split = no_foro.split(' ');
      no_foro = no_foro_split[no_foro_split.length - 1];
    }
    this._http.get(`api/misNotificaciones`, {
      params: new HttpParams()
        .set('rol', rolActual)
        .set('no_foro', no_foro)
        .set('respuesta', respuesta)
      // .set('enviados',enviados)
    }).pipe(
      finalize(() => this.cargando = false)
    ).subscribe((res: any) => {
      this.notificaciones = res.data;
      this.totalNotificaciones = res.total;
    });
  }

  responderNotificacion(respuesta: boolean, folio: string, solicitud: string, notificacion: any) {
    notificacion.editar = false;
    const respuestaAnterior = notificacion.respuesta;
    notificacion.respuesta = respuesta;
    return this._http.put(`api/responder_notificacion/${folio}`, {
      // respuesta: respuesta,
      // solicitud: solicitud,
      respuesta: notificacion.respuesta,
      solicitud: solicitud
    }).pipe(
      catchError(error => {
        notificacion.editar = true;
        notificacion.respuesta = respuestaAnterior === true ? false : respuestaAnterior === false ? true : null;
        return throwError(error)
      })
    );
  }

  misForos() {
    const rolActual = this._router.url.includes("Administrador") ? "Administrador" : this._router.url.includes("Alumno") ? "Alumno" : "Docente";
    return this._http.get<string[]>(`api/misForos`, {
      params: new HttpParams().set('rol', rolActual)
    });
  }

  // misNotificaciones(){
  //   this._notificacionService.misNotificaciones().subscribe((res:any)=>{
  //     this.notificaciones = res;
  //   });
  // }
}
