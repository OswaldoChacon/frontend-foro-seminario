import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  objectKeys = Object.keys;
  opcionesForo: string[] = [];
  opcionesRespuesta: string[] = ['Pendientes', 'Aceptados', 'Rechazados'];
  opcionesEnviados: string[] = ['Recibidos', 'No recibidos'];

  foroElegido: string = 'Foro en curso';
  respuestaElegida: string = 'Pendientes';
  enviadoElegido: string = 'Recibidos';

  constructor(
    public _notificacionesService: NotificacionesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // this.rolActual = this._router.url.includes('Administrador') ? 'Administrador': this._router.url.includes('Alumno') ? 'Alumno':'Docente';
    this._notificacionesService.misForos().subscribe((foros: string[]) => this.opcionesForo.push(...foros));
    this.misNotificaciones();
    // this.foroElegido = this.opcionesForo.includes('Foro en curso') ? 'Foro en curso':this.opcionesForo.length > 0 ? this.opcionesForo[0]:'';
    console.log(this.opcionesForo.includes('Foro en curso'));
    console.log(this.foroElegido);
  }

  responder(notificacion: any, solicitud: string,valor:boolean) {
    console.log(notificacion);
    notificacion.respuesta = valor;
    console.log(notificacion);
    this._notificacionesService.responderNotificacion(notificacion.respuesta, notificacion.proyecto.folio, solicitud).pipe(
      tap(()=>{
        notificacion.editar = false;
      })
    ).subscribe();
  }

  misNotificaciones() {
    this._notificacionesService.misNotificaciones(this.foroElegido, this.respuestaElegida, this.enviadoElegido);
  }

}
