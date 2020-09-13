import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfesorRoutingModule } from './profesor-routing.module';
import { ProfesorComponent } from './profesor.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfesorComponent],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    SharedModule,
  ]
})
export class ProfesorModule { }
