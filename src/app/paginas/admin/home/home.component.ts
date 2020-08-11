import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HomeComponent implements OnInit {

  // notificaciones: {Array ,aceptados:number};
  // notificaciones:any=[];  
  editar: boolean = false;
  miSolicitud: any;
  alumnos: any;
  formProyecto = this._formBuilder.group({
    'titulo': new FormControl('',Validators.required)
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _notificacionService: NotificacionesService,
    private _proyectoService: ProyectosService
  ) { }

  ngOnInit(): void {
    this.getSolicitud();
    this.listarAlumnos();
  }

  editar_titulo(){
    console.log("l");
  }

  agregarIntegrante(alumno: Usuario) {
    alumno.myTeam = !alumno.myTeam;
    if (alumno.myTeam)
      this._proyectoService.agregarIntegrante(this.miSolicitud.proyecto.folio, alumno.num_control).pipe(
        catchError(error => {
          alumno.myTeam = !alumno.myTeam;
          return throwError(error);
        })
      ).subscribe(resp => this.getSolicitud());
    else
      this._proyectoService.eliminarIntegrante(this.miSolicitud.proyecto.folio, alumno.num_control).pipe(
        catchError(error => {
          alumno.myTeam = !alumno.myTeam;
          return throwError(error);
        })
      ).subscribe(resp => this.getSolicitud());
  }

  getSolicitud() {
    this._notificacionService.miSolicitud().subscribe((solicitud: any) => {
      this.miSolicitud = solicitud;
      this.formProyecto.get('titulo').setValue(solicitud.proyecto.titulo)
    });

  }


  listarAlumnos() {
    this._proyectoService.listaAlumnos().subscribe((alumnos: any) => {
      this.alumnos = alumnos;
    })

  }
}
