import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlantillasRoutingModule } from './plantilla-routing.module';
import { PlantillasComponent } from './plantillas.component';
import { GruposComponent } from './grupos/grupos.component';

@NgModule({
  declarations: [
    PlantillasComponent,
    GruposComponent   
  ],
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class PlantillasModule { }
