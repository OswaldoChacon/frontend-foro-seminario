import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { HomeComponent } from '../admin/home/home.component';
import { NotificacionesComponent } from 'src/app/components/notificaciones/notificaciones.component';
import { MisProyectosComponent } from 'src/app/components/mis-proyectos/mis-proyectos.component';

const routes: Routes = [
  {
    path: "", component: ProfesorComponent, children: [
      // {path:'registrar-alumno',component:},
      {path:'mis-proyectos', component: MisProyectosComponent},
      { path: 'home', component: HomeComponent },
      { path: 'notificaciones', component: NotificacionesComponent },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorRoutingModule { }
