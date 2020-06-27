import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ForosComponent } from "./foros.component";
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { ConfigurarForoComponent } from "./configurar-foro/configurar-foro.component";
import { AsignarJuradoComponent } from "./asignar-jurado/asignar-jurado.component";

const routes: Routes = [
  {
    path: "",
    component: ForosComponent,
  },
  // children: [
  { path: "proyectos/:id", component: ProyectosComponent },
  { path: "configurar-foro/:id", component: ConfigurarForoComponent },
  { path: "asignar-jurado", component: AsignarJuradoComponent },
  // ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForosRoutingModule {}
