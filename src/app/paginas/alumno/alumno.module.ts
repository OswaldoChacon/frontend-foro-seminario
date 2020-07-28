import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AlumnoComponent, RegistrarProyectoComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,    
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AlumnoModule { }
