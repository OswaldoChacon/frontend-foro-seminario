import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  totalNotificaciones = 0;
  private notificacionesSubject = new BehaviorSubject<any>([]);
  // notificaciones = this.notificacionesSubject.asObservable();
  notificaciones:any;
  constructor(
    private _http: HttpClient
  ) { 
    this.misNotificaciones();
  }

  miSolicitud() {
    return this._http.get(`api/miSolicitud`);
  }

  misNotificaciones(){
    // return this._http.get(`api/misNotificaciones`);
    this._http.get(`api/misNotificaciones`).subscribe((res:any)=>{
      // this.notificacionesSubject.next(res);
      // console.log(res.length)
      // console.log(this.notificaciones);
      this.notificaciones = res;
      this.totalNotificaciones = this.notificaciones.length
      // this.notificaciones.
    });
  }
 
  responderNotificacion(respuesta:boolean,folio:string){
    return this._http.put(`api/responder_notificacion/${folio}`,{respuesta:respuesta});
  }


  // misNotificaciones(){
  //   this._notificacionService.misNotificaciones().subscribe((res:any)=>{
  //     this.notificaciones = res;                  
  //   });
  // }

}
