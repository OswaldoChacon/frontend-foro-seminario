import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { LineasComponent } from "./lineas/lineas.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../../services/auth/guards/auth.guard";
import { JuradoComponent } from "./horario/jurado/jurado.component";
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';
import { GenerarHorarioComponent } from './horario/generar-horario/generar-horario.component';
import { CambiarContrasenaComponent } from 'src/app/shared/cambiar-contrasena/cambiar-contrasena.component';
import { RolesSolicitudComponent } from './roles-solicitud/roles-solicitud.component';

const routes: Routes = [
  {
    path: '',
    // component: AdminComponent,
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'roles', component: RolesSolicitudComponent},
      { path: 'solicitudes', component: RolesSolicitudComponent},
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'lineas-investigacion', component: LineasComponent },
      { path: 'tipos-proyectos', component: LineasComponent },
      // { path: "foros", component: ForosComponent},
      { path: 'foros', loadChildren: () => import('./foros/foros.module').then(m => m.ForosModule) },
      { path: 'jurado', component: JuradoComponent },
      { path: 'generar_horario', component: GenerarHorarioComponent },
      { path: 'cambiar_contrasena', component: CambiarContrasenaComponent },
      // { path: 'horarios', component: HorarioComponent },      
      // { path: 'generar-horario', component: HorarioComponent },
      // {path:"proyectos_jurado" ,component:},
      { path: '**', redirectTo: 'home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// export const ADMIN_ROUTES = RouterModule.forChild(routes);
export class AdminRoutingModule { }
