import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  // notificaciones: any ;//= [1,1,1,1,1,1];
  rolActual:string = '';
  constructor(
    public _notificacionesService: NotificacionesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.rolActual = this._router.url.includes('Administrador') ? 'Administrador': this._router.url.includes('Alumno') ? 'Alumno':'Docente';    
    // this._notificacionesService.misNotificaciones(this.rolActual);    
    // this._notificacionesService.misNotificaciones().subscribe(res=>this.notificaciones=res);
  }

  responder(notificacion:any,solicitud:string){
    console.log(solicitud);
    notificacion.respuesta = !notificacion.respuesta;
    this._notificacionesService.responderNotificacion(notificacion.respuesta,notificacion.proyecto.folio,solicitud).subscribe();
  }

}
