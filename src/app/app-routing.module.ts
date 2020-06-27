import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NoAuthGuard } from "./services/auth/guards/no-auth.guard";
import { AuthGuard } from "./services/auth/guards/auth.guard";
import { AdminComponent } from "./paginas/admin/admin.component";
import { DashboardComponent } from "./paginas/admin/dashboard/dashboard.component";

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: "Administrador",
    // canActivate: [AuthGuard],
    // component:DashboardComponent,
    loadChildren: () =>
      import("./paginas/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "Docente",
    loadChildren: () =>
      import("./paginas/profesor/profesor.module").then(
        (m) => m.ProfesorModule
      ),
  },
  {
    path:"Alumno",
    loadChildren: ()=> import('./paginas/alumno/alumno.module').then((m)=>m.AlumnoModule)
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
