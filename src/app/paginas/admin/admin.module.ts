import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { DialogsModule } from './dialogs/dialogs.module';

import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LineasComponent } from './lineas/lineas.component';
import { JuradoComponent } from './horario/jurado/jurado.component';
import { UsuarioDialogComponent } from '../../dialogs/usuario/usuario.dialog.component';
import { GenerarHorarioComponent } from './horario/generar-horario/generar-horario.component';
import { RolesSolicitudComponent } from './roles-solicitud/roles-solicitud.component';
import { PlantillasDialogComponent } from 'src/app/dialogs/PlantillasDialog/PlantillasDialog.component';
import { PlantillasComponent } from './plantillas/plantillas.component';




@NgModule({
  declarations: [
    AdminComponent,    
    UsuariosComponent,
    LineasComponent,        
    JuradoComponent,    
    UsuarioDialogComponent,
    PlantillasDialogComponent,
    GenerarHorarioComponent, 
    RolesSolicitudComponent,
    PlantillasComponent
  ],
  imports: [
    CommonModule,    
    ReactiveFormsModule,
    AdminRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    ComponentsModule,
    DialogsModule
  ],
  providers:[    
  ]
})
export class AdminModule { }
