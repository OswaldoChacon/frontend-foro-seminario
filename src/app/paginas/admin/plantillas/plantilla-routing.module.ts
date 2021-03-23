import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GruposComponent } from "./grupos/grupos.component";
import { PlantillasComponent } from "./plantillas.component";


const routes: Routes = [
  {
    path: '',
    component: PlantillasComponent,
  },
  { path: 'grupos/:id', component: GruposComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillasRoutingModule { }
