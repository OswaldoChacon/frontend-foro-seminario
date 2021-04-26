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
  constructor(private _http: HttpClient, private _router: Router) { }  

  misNotificaciones(no_foro: string = 'Foro en curso', respuesta: string = 'Pendientes', enviados: string = 'Recibidos') {
    const rolActual = this._router.url.includes("administrador") ? "administrador" : this._router.url.includes("alumno") ? "alumno" : "docente";
    let no_foro_split: string[];
    if (no_foro !== 'Foro en curso') {
      no_foro_split = no_foro.split(' ');
      no_foro = no_foro_split[no_foro_split.length - 1];
    }
    this._http.get(`api/mis_notificaciones`, {
      params: new HttpParams()
        .set('rol', rolActual)
        .set('no_foro', no_foro)
        .set('respuesta', respuesta)      
    }).pipe(
      finalize(() => this.cargando = false)
    ).subscribe((res: any) => {
      this.notificaciones = res.data;
      this.totalNotificaciones = res.total;
    });
  }

  responderNotificacion(respuesta: boolean, folio: string, solicitud: string, notificacion: any) {
    const rolActual = this._router.url.includes("administrador") ? "administrador" : this._router.url.includes("alumno") ? "alumno" : "docente";
    notificacion.editar = false;
    const respuestaAnterior = notificacion.respuesta;
    notificacion.respuesta = respuesta;
    return this._http.put(`api/responder_notificacion/${folio}`, {      
      respuesta: notificacion.respuesta,
      solicitud: solicitud,
      rol: rolActual,
      folio: notificacion.folio,
      comentarios: notificacion.comentarios
    }
    ).pipe(
      catchError(error => {
        notificacion.editar = true;
        notificacion.respuesta = respuestaAnterior === true ? false : respuestaAnterior === false ? true : null;
        return throwError(error)
      })
    );
  }

  misForos() {
    const rolActual = this._router.url.includes("administrador") ? "administrador" : this._router.url.includes("alumno") ? "alumno" : "docente";
    return this._http.get<string[]>(`api/mis_foros`, {
      params: new HttpParams().set('rol', rolActual)
    });
  }  
}
