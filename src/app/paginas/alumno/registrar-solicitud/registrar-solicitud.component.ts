import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Rol } from 'src/app/modelos/rol.model';
import { RolesService } from 'src/app/services/rol/rol.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {

  cargando=true;
  solicitudes: Rol[];
  formSolicitud = this._formBuilder.group({
    motivo: ['', [Validators.required]],
    tipo_solicitud: [this.solicitudes,[Validators.required]]
  });
  
  proyectoEnCurso:any;
  docentes:any;
  constructor(
    private _formBuilder: FormBuilder,
    private _solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this._solicitudesService.getregistrarSolicitud().subscribe((data) => { 
      this.cargando = false;
      this.solicitudes = data.solicitudes;
      this.proyectoEnCurso = data.proyecto;
      this.docentes = data.docentes;
    });
  }

  seleccionarSolicitud(solicitud: string) {
    this.formSolicitud.removeControl('nuevo_asesor');
    this.formSolicitud.removeControl('nuevo_titulo');
    if (solicitud === 'CAMBIO DE TITULO DEL PROYECTO')
      this.formSolicitud.addControl('nuevo_titulo', new FormControl('', [Validators.required]));
    else if (solicitud === 'CAMBIO DE ASESOR')
      this.formSolicitud.addControl('nuevo_asesor', new FormControl('', [Validators.required]));  

  }

  registrarSolicitud(){
    this._solicitudesService.registrarSolicitud(this.formSolicitud.value).subscribe(()=>this.formSolicitud.reset());
  }
}
