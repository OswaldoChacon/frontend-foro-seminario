import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';
import { HomeComponent } from '../admin/home/home.component';
import { NotificacionesComponent } from 'src/app/shared/notificaciones/notificaciones.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RegistrarSolicitudComponent } from './registrar-solicitud/registrar-solicitud.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registrar-proyecto', component: RegistrarProyectoComponent },
      { path: 'notificaciones', component: NotificacionesComponent},
      { path: 'mis-solicitudes', component: SolicitudesComponent},
      { path: 'registrar-solicitud', component: RegistrarSolicitudComponent},
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule { }
