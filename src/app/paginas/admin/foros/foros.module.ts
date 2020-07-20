import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForosRoutingModule } from './foros-routing.module';
import { ForosComponent } from './foros.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ConfigurarForoComponent } from './configurar-foro/configurar-foro.component';
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaForosComponent } from './lista-foros/lista-foros.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ForosComponent,
    ProyectosComponent,
    ConfigurarForoComponent,
    ListaForosComponent,    
  ],
  imports: [
    CommonModule,
    ForosRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ForosModule { }
