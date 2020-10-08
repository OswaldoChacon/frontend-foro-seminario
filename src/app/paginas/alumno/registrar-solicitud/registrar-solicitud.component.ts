import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Rol } from 'src/app/modelos/rol.model';
import { RolesService } from 'src/app/services/rol/rol.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-solicitud',
  templateUrl: './registrar-solicitud.component.html',
  styleUrls: ['./registrar-solicitud.component.css']
})
export class RegistrarSolicitudComponent implements OnInit {

  cargando = true;
  solicitudes: Rol[] = [];
  formSolicitud = this._formBuilder.group({
    motivo: ['', [Validators.required]],
    tipo_solicitud: [this.solicitudes, [Validators.required]]
  });

  proyectoEnCurso: Proyecto;
  docentes: Usuario[];
  constructor(
    private _formBuilder: FormBuilder,
    private _solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this._solicitudesService.getregistrarSolicitud().pipe(finalize(() => this.cargando = false)).subscribe((data) => {
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

  registrarSolicitud() {
    this._solicitudesService.registrarSolicitud(this.formSolicitud).subscribe(() => this.formSolicitud.reset());
  }
}
