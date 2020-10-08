import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './paginas/admin/home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth/guards/auth.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AdminModule } from './paginas/admin/admin.module';
import { HttpErrorInterceptor } from './services/interceptors/http-error.interceptor';
import { SharedModule } from './shared/shared.module';
import { ForgotPasswordDialogComponent } from './dialogs/forgot-password/forgot-password.dialog.component';
import { ComponentsModule } from './components/components.module';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, 
    ForgotPasswordDialogComponent    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 1,
      timeOut: 2000,
    }),
    NgxPermissionsModule.forRoot(),
    RouterModule,
    AdminModule,
    ComponentsModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthGuard,    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
