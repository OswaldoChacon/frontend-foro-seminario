import { ProyectosComponent } from './../admin/foros/proyectos/proyectos.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';
import { HomeComponent } from '../admin/home/home.component';
import { NotificacionesComponent } from 'src/app/components/notificaciones/notificaciones.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';
import { AlumnoComponent } from './alumno.component';
import { MisProyectosComponent } from 'src/app/components/mis-proyectos/mis-proyectos.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: 'home', component: AlumnoComponent },
      { path: 'registrar-proyecto', component: RegistrarProyectoComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'mis-solicitudes', component: SolicitudesComponent },
      { path: 'proyectos', component: MisProyectosComponent },      
      { path: 'registrar-solicitud', component: RegistrarSolicitudComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule { }
