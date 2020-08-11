import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LineasComponent } from './lineas/lineas.component';
import { MaterialModule } from '../../material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// import { AsignarJuradoComponent } from './foros/asignar-jurado/asignar-jurado.component';
import { OverviewDialogComponent } from '../../dialogs/overview/overview.dialog.component';
// import { HorarioComponent } from '../admin/horario/horario.component';
import { JuradoComponent } from './horario/jurado/jurado.component';
import { LineaDialogComponent } from '../../dialogs/linea/linea.dialog.component';
import { UsuarioDialogComponent } from '../../dialogs/usuario/usuario.dialog.component';
import { ForoDialogComponent } from '../../dialogs/foro/foro.dialog.component';
import { DocentesDiaogComponent } from '../../dialogs/docentes/docentes.dialog.component';
import { HorarioJuradoDialogComponent } from '../../dialogs/horario-jurado/horario-jurado.dialog.component';
import { RolesDialogComponent } from '../../dialogs/roles/roles.dialog.component';
// import { UsersService } from '../services/usuarios/users.service';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RouterModule } from '@angular/router';
import { FechaDialogComponent } from 'src/app/dialogs/fecha/fecha.dialog.component';
import { GenerarHorarioComponent } from './horario/generar-horario/generar-horario.component';
import { RolesSolicitudComponent } from './roles-solicitud/roles-solicitud.component';


@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UsuariosComponent,
    LineasComponent,    
    // AsignarJuradoComponent,
    OverviewDialogComponent,
    // HorarioComponent,
    JuradoComponent,    
    UsuarioDialogComponent,
    LineaDialogComponent,
    ForoDialogComponent,
    DocentesDiaogComponent,
    HorarioJuradoDialogComponent,
    FechaDialogComponent, 
    RolesDialogComponent,
    GenerarHorarioComponent, 
    RolesSolicitudComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers:[
    // UsersService
  ]
})
export class AdminModule { }
