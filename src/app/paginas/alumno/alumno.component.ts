import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { finalize, tap } from 'rxjs/operators';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  form: FormGroupDirective;
  aceptado: boolean = false;
  notificacionSeleccionado: any;
  editar: boolean = false;
  miProyecto: Proyecto;
  alumnos: Usuario[] = [];
  objectKeys = Object.keys;

  constructor(
    private proyectoService: ProyectoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getProyectoActual();
    this.listarAlumnos();
  }

  elegirNotificacion(value: any) {
    this.notificacionSeleccionado = value;
    if (this.notificacionSeleccionado) {
      if (this.notificacionSeleccionado[this.notificacionSeleccionado.length - 1].scalar === this.notificacionSeleccionado.length - 1)
        this.aceptado = true;
      else
        this.aceptado = false;
    }
  }

 

  enviarSolicitud() {
    this.proyectoService.enviarSolicitud(this.miProyecto).pipe(tap(() => { this.getProyectoActual(); this.listarAlumnos() })).subscribe();
  }

  cancelarSolicitud() {
    this.proyectoService.cancelarSolicitud(this.miProyecto).pipe(tap(() => { this.getProyectoActual(); this.listarAlumnos() })).subscribe();
  }

  agregarIntegrante(alumno: Usuario) {
    alumno.myTeam = !alumno.myTeam;
    if (alumno.myTeam)
      this.proyectoService.agregarIntegrante(this.miProyecto, alumno).subscribe(resp => this.getProyectoActual());
    else
      this.proyectoService.eliminarIntegrante(this.miProyecto, alumno).subscribe(resp => this.getProyectoActual());
  }

  getProyectoActual() {
    this.proyectoService.proyectoActual().subscribe((proyecto) => {
      if (proyecto != null)
        this.miProyecto = proyecto;
    });

  }

  listarAlumnos() {
    this.usuarioService.getAlumnos().subscribe(alumnos => {
      if (alumnos != null)
        this.alumnos = alumnos;
    })

  }
}
