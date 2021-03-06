import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [AlumnoComponent, RegistrarProyectoComponent, SolicitudesComponent, RegistrarSolicitudComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlumnoRoutingModule,
    MaterialModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AlumnoModule { }
