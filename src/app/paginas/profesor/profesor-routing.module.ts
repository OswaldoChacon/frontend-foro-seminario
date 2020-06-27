import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfesorComponent } from "./profesor.component";
import { SidenavComponent } from "src/app/shared/sidenav/sidenav.component";

const routes: Routes = [
  { path: "", component: SidenavComponent, children: [
    // {path:'registrar-alumno',component:},
    // {path:''}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesorRoutingModule {}
