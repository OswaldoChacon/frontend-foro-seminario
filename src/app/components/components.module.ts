import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroComponent } from './filtro/filtro.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';


@NgModule({
  declarations: [FiltroComponent, NotificacionesComponent, FormularioProyectoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FiltroComponent,
    NotificacionesComponent,
    FormularioProyectoComponent
  ]
})
export class ComponentsModule { }
