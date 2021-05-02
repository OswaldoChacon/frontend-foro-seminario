import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { HomeComponent } from '../admin/home/home.component';
import { NotificacionesComponent } from 'src/app/components/notificaciones/notificaciones.component';
import { MisProyectosComponent } from 'src/app/components/mis-proyectos/mis-proyectos.component';
import { UsuariosComponent } from '../admin/usuarios/usuarios.component';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { ProyectoComponent } from "src/app/components/proyecto/proyecto.component";

const routes: Routes = [
  {
    path: '', 
    component: ProfesorComponent, 
    children: [
      { path: 'registrar-alumno', component: UsuariosComponent },
      { path: 'proyectos', component: MisProyectosComponent },
      { path: 'proyectos/:id', component: ProyectoComponent },
      { path: 'home', component: HomeComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorRoutingModule { }
