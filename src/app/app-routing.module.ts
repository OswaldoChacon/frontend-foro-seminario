import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { NoAuthGuard } from "./services/auth/guards/no-auth.guard";
import { AuthGuard } from "./services/auth/guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'Administrador',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./paginas/admin/admin.module').then((m) => m.AdminModule),
    data: { rol: 'Administrador' }
  },
  {
    path: 'Docente',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./paginas/profesor/profesor.module').then((m) => m.ProfesorModule),
    data: { rol: 'Docente' }
  },
  {
    path: 'Alumno',
    canActivate: [AuthGuard],
    loadChildren: () => import('./paginas/alumno/alumno.module').then((m) => m.AlumnoModule),
    data: { rol: 'Alumno' }
  },  
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
