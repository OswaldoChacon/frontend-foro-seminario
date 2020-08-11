import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  // notificaciones: any ;//= [1,1,1,1,1,1];
  constructor(
    public _notificacionesService: NotificacionesService
  ) { }

  ngOnInit(): void {
    this._notificacionesService.misNotificaciones();
    // this._notificacionesService.misNotificaciones().subscribe(res=>this.notificaciones=res);
  }

  responder(notificacion:any){
    notificacion.respuesta = !notificacion.respuesta;
    this._notificacionesService.responderNotificacion(!notificacion.respuesta,notificacion.proyecto.folio).subscribe();
  }

}
