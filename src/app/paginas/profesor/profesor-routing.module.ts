import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { HomeComponent } from '../admin/home/home.component';
import { NotificacionesComponent } from 'src/app/shared/notificaciones/notificaciones.component';

const routes: Routes = [
  {
    path: "", component: SidenavComponent, children: [
      // {path:'registrar-alumno',component:},
      // {path:''}
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
