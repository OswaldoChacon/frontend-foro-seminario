import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTableModule } from "@angular/material/table";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { PortalModule } from '@angular/cdk/portal';
// Toastr


@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,    
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,    
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatStepperModule,
    PortalModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,  
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatStepperModule,
    PortalModule
    // ToastrModule.forRoot()
  ]
})
export class MaterialModule {}
