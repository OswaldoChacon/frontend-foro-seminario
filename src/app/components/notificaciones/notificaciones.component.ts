import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  objectKeys = Object.keys;  
  opcionesForo: string[] = ['Foro en curso'];
  opcionesRespuesta: string[] = ['Pendientes', 'Aceptados', 'Rechazados'];
  opcionesEnviados: string[] = ['Recibidos', 'No recibidos'];

  foroElegido: string = 'Foro en curso';
  respuestaElegida: string = 'Pendientes';
  enviadoElegido: string = 'Recibidos';

  constructor(
    public notificacionesService: NotificacionesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.notificacionesService.misForos().subscribe((foros: string[]) => this.opcionesForo.push(...foros));
    this.misNotificaciones();
  }

  responder(notificacion: any, solicitud: string, respuesta: boolean) {    
    // this.notificacionesService.responderNotificacion(notificacion.respuesta, notificacion.proyecto.folio, solicitud, notificacion).subscribe(() => this.misNotificaciones());
    this.notificacionesService.responderNotificacion(respuesta, notificacion.proyecto.folio, solicitud, notificacion).subscribe(() => this.misNotificaciones());
  }

  misNotificaciones() {
    this.notificacionesService.misNotificaciones(this.foroElegido, this.respuestaElegida, this.enviadoElegido);
  }

}
