import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { LineasComponent } from "./lineas/lineas.component";
import { ForosComponent } from "./foros/foros.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "../../services/auth/guards/auth.guard";
import { ConfigurarForoComponent } from "./foros/configurar-foro/configurar-foro.component";
import { HorarioComponent } from "./horario/horario.component";
import { HorarioJuradoComponent } from "./horario/horario-jurado/horario-jurado.component";
import { ProyectosComponent } from './foros/proyectos/proyectos.component';
import { AsignarJuradoComponent } from './foros/asignar-jurado/asignar-jurado.component';
import { SidenavComponent } from '../../shared/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: "",
    // component: AdminComponent,
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "usuarios", component: UsuariosComponent },
      { path: "lineas-investigacion", component: LineasComponent },
      // { path: "foros", component: ForosComponent},
      { path: "foros", 
        // component: ForosComponent,
        loadChildren: ()=> import('./foros/foros.module').then(m=>m.ForosModule)
        // loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      // component: ForosComponent},
      },            
      { path: "horarios", component: HorarioComponent },
      { path: "jurado", component: HorarioJuradoComponent },
      { path: "generar-horario", component: HorarioComponent },
      // {path:"proyectos_jurado" ,component:},
      { path: "**", redirectTo: "home" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
// export const ADMIN_ROUTES = RouterModule.forChild(routes);
export class AdminRoutingModule {}
