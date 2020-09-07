import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForosRoutingModule } from './foros-routing.module';
import { ForosComponent } from './foros.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { ConfigurarForoComponent } from './configurar-foro/configurar-foro.component';
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    ForosComponent,
    ProyectosComponent,
    ConfigurarForoComponent,    
  ],
  imports: [
    CommonModule,
    ForosRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ForosModule { }
