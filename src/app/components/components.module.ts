import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FiltroComponent } from './filtro/filtro.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { FormularioProyectoComponent } from './formulario-proyecto/formulario-proyecto.component';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { RouterModule } from '@angular/router';
import { ProyectoComponent } from './proyecto/proyecto.component';


@NgModule({
  declarations: [
    FiltroComponent,
    NotificacionesComponent,
    FormularioProyectoComponent,
    MisProyectosComponent, 
    PerfilComponent,
    CambiarContrasenaComponent,    
    ProyectoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
    FiltroComponent,
    NotificacionesComponent,
    FormularioProyectoComponent,
    MisProyectosComponent,
    PerfilComponent,
    CambiarContrasenaComponent,
    ProyectoComponent
  ]
})
export class ComponentsModule { }
