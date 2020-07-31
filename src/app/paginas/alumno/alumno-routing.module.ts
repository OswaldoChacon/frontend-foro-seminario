import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';
import { HomeComponent } from '../admin/home/home.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'registrar-proyecto', component: RegistrarProyectoComponent },
      { path: '**', redirectTo: 'home' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule { }
