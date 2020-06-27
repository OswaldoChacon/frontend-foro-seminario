import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ButtonsComponent } from './buttons/buttons.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    ButtonsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,    
    RouterModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[
    HeaderComponent,    
    SidenavComponent,
    ButtonsComponent,
  ]
})
export class SharedModule { }
