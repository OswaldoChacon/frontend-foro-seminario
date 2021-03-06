import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/modelos/proyecto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HomeComponent {

  // notificaciones: {Array ,aceptados:number};
  // notificaciones:any=[];  
  // form: any;
  // formProyecto = this._formBuilder.group({
  //   titulo: new FormControl('', Validators.required),
  //   linea: new FormControl('', Validators.required),
  //   tipo: new FormControl('', Validators.required)
  // });

  // cargando: boolean = true
  // aceptado: boolean = false;
  // notificacionSeleccionado: any;
  // editar: boolean = false;
  // misSolicitudes: any = {};
  // miProyecto: Proyectos;
  // alumnos: Usuario[] = [];

  // objectKeys = Object.keys;

  // constructor(
  //   private _formBuilder: FormBuilder,
  //   private _notificacionService: NotificacionesService,
  //   private _proyectoService: ProyectosService
  // ) { }

  // ngOnInit(): void {
  //   this.getSolicitud();
  //   this.listarAlumnos();
  //   const testObject = {};
  // }

  // editar_titulo() {
  // }

  // setBackgroundColor(value: string) {
  //   switch (value) {
  //     case 'REGISTRO DE PROYECTO':
  //       return 'green';
  //     case 'CAMBIO DE TITULO DEL PROYECTO':
  //       return '#3E8EE8';
  //     case 'CANCELACION DEL PROYECTO':
  //       return 'red';
  //     case 'DAR DE BAJA A UN INTEGRANTE':
  //       return 'red';
  //     case 'CAMBIO DE ASESOR':
  //       return '#79D488';
  //   }
  // }

  // iconos(value: string) {
  //   switch (value) {
  //     case 'REGISTRO DE PROYECTO':
  //       return 'book';
  //     case 'CAMBIO DE TITULO DEL PROYECTO':
  //       return 'compare_arrows';
  //     case 'CANCELACION DEL PROYECTO':
  //       return 'cancel';
  //     case 'DAR DE BAJA A UN INTEGRANTE':
  //       return 'exit_to_app';
  //     case 'CAMBIO DE ASESOR':
  //       return 'autorenew';
  //   }
  // }

  // elegirNotificacion(value: any) {
  //   this.notificacionSeleccionado = value;
  //   if (this.notificacionSeleccionado) {
  //     if (this.notificacionSeleccionado[this.notificacionSeleccionado.length - 1].scalar === this.notificacionSeleccionado.length - 1)
  //       this.aceptado = true;
  //     else
  //       this.aceptado = false;
  //   }
  // }

  // enviarSolicitud() {
  //   this._proyectoService.enviarSolicitud(this.miProyecto.folio).pipe(
  //     tap(res => {
  //       this.misSolicitudes();
  //     })
  //   ).subscribe();
  // }

  // agregarIntegrante(alumno: Usuario) {
  //   alumno.myTeam = !alumno.myTeam;
  //   if (alumno.myTeam)
  //     this._proyectoService.agregarIntegrante(this.miProyecto.folio, alumno.num_control).pipe(
  //       catchError(error => {
  //         alumno.myTeam = !alumno.myTeam;
  //         return throwError(error);
  //       })
  //     ).subscribe(resp => this.getSolicitud());
  //   else
  //     this._proyectoService.eliminarIntegrante(this.miProyecto.folio, alumno.num_control).pipe(
  //       catchError(error => {
  //         alumno.myTeam = !alumno.myTeam;
  //         return throwError(error);
  //       })
  //     ).subscribe(resp => this.getSolicitud());
  // }

  // getSolicitud() {
  //   this._notificacionService.miSolicitud().pipe(
  //     finalize(() => this.cargando = false)
  //   ).subscribe((solicitud) => {
  //     if (!solicitud.mensaje) {
  //       this.misSolicitudes = solicitud.data;
  //       this.miProyecto = solicitud.proyecto;
  //       this.formProyecto.get('titulo').setValue(solicitud.proyecto.titulo)
  //       this.formProyecto.get('linea').setValue(solicitud.proyecto.titulo)
  //       this.formProyecto.get('tipo').setValue(solicitud.proyecto.titulo)
  //     }
  //   });

  // }


  // listarAlumnos() {
  //   this._proyectoService.listaAlumnos().subscribe((alumnos) => {      
  //     if (alumnos != null)
  //       this.alumnos = alumnos;      
  //   })

  // }
}
