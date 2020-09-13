import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoDialogComponent } from './foro/foro.dialog.component';
import { LineaDialogComponent } from './linea/linea.dialog.component';
import { DocentesDiaogComponent } from './docentes/docentes.dialog.component';
import { RolesDialogComponent } from './roles/roles.dialog.component';
import { FechaDialogComponent } from './fecha/fecha.dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocentesSheetComponent } from '../bottomsheets/docentes/docentes.sheet.component';
import { HorarioJuradoSheetComponent } from '../bottomsheets/horario-jurado/horario-jurado.sheet.component';
import { BreaksSheetComponent } from '../bottomsheets/breaks.sheet/breaks.sheet.component';


@NgModule({
  declarations: [
    ForoDialogComponent,
    LineaDialogComponent,
    DocentesDiaogComponent,
    RolesDialogComponent,
    FechaDialogComponent,

    DocentesSheetComponent,
    HorarioJuradoSheetComponent,
    BreaksSheetComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  exports:[
    ForoDialogComponent,
    LineaDialogComponent,
    DocentesDiaogComponent,
    RolesDialogComponent,
    FechaDialogComponent,

    DocentesSheetComponent,
    HorarioJuradoSheetComponent,
    BreaksSheetComponent
  ]
})
export class DialogsModule { }
