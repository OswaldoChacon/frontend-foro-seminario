import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Proyectos } from 'src/app/modelos/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  totalNotificaciones = 0;
  private notificacionesSubject = new BehaviorSubject<any>([]);
  // notificaciones = this.notificacionesSubject.asObservable();
  notificaciones:any;
  // rolActual:string = '';
  constructor(
    private _http: HttpClient,    
    private _router: Router,
  ) {     
    this.misNotificaciones();    
  }

  miSolicitud() {
    return this._http.get<{data:any,proyecto:Proyectos,mensaje:string}>(`api/miSolicitud`);
  }

  misNotificaciones(){
    const rolActual = this._router.url.includes('Administrador') ? 'Administrador': this._router.url.includes('Alumno') ? 'Alumno':'Docente';
    // return this._http.get(`api/misNotificaciones`);
    this._http.get(`api/misNotificaciones`,{
      params: new HttpParams().set('rol',rolActual)
    }).subscribe((res:any)=>{
      // this.notificacionesSubject.next(res);      
      this.notificaciones = res;
      this.totalNotificaciones = this.notificaciones.total
      // this.notificaciones.
    });
  }
 
  responderNotificacion(respuesta:boolean,folio:string,solicitud:string){
    return this._http.put(`api/responder_notificacion/${folio}`,{respuesta:respuesta,solicitud:solicitud});
  }


  // misNotificaciones(){
  //   this._notificacionService.misNotificaciones().subscribe((res:any)=>{
  //     this.notificaciones = res;                  
  //   });
  // }

}
