import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroComponent } from './filtro/filtro.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FiltroComponent, 
    NotificacionesComponent, 
    FormularioProyectoComponent, 
    MisProyectosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    FiltroComponent,
    NotificacionesComponent,
    FormularioProyectoComponent,
    MisProyectosComponent
  ]
})
export class ComponentsModule { }
