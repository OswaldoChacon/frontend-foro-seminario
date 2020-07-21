import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './paginas/admin/home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth/guards/auth.guard';
import { DashboardComponent } from './paginas/admin/dashboard/dashboard.component';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminModule } from './paginas/admin/admin.module';
import { HttpErrorInterceptor } from './services/interceptors/http-error.interceptor';
import { AdminComponent } from './paginas/admin/admin.component';
import { SharedModule } from './shared/shared.module';
import { ForgotPasswordDialogComponent } from './dialogs/forgot-password/forgot-password.dialog.component';
// import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,        
    HomeComponent,    
    LoginComponent, ForgotPasswordDialogComponent,
    // DashboardComponent,
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
      maxOpened:1,
      timeOut: 3000,
    }),
    NgxPermissionsModule.forRoot(),
    RouterModule,
    AdminModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
