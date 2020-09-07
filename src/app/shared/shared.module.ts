import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonsComponent } from './buttons/buttons.component';
import { TableComponent } from './table/table.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardHeaderComponent } from './card-header/card-header.component';
import { AlertaComponent } from './alerta/alerta.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    ButtonsComponent,
    TableComponent,
    CambiarContrasenaComponent,
    CardHeaderComponent,
    AlertaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    MaterialModule,  
    RouterModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[
    HeaderComponent,    
    SidenavComponent,
    ButtonsComponent,
    TableComponent,
    CardHeaderComponent,
    AlertaComponent,
  ]
})
export class SharedModule { }
