import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";
import { RegistrarProyectoComponent } from './registrar-proyecto/registrar-proyecto.component';

const routes: Routes = [
  { path: "", component: SidenavComponent, children: [{
    path:'registrar-proyecto',component:RegistrarProyectoComponent
  }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRoutingModule {}
