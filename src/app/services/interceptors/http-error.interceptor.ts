import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { NotificacionesService } from '../notificaciones/notificaciones.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: NotificacionesService,
    private authService: AuthService,
    private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {   
    let tokenReq = request.clone({
      setHeaders:{
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenReq).pipe(
      tap(event =>{
        if(event instanceof HttpResponse){
          if(event.body.message)
            this.toastr.showToastOk(event.body.message,"");            
        }
      }),
      catchError(error => {        
        if (error instanceof HttpErrorResponse) {  
          if(error.status === 401)
            this.handleAuthError();
          if(error.status > 500)
            this.toastr.showToastError(error.error,"");
          if(error.error.message)
            this.toastr.showToastError(error.error.message,"");         
        } else {
          // backend error
          // mensaje = `Server-side error: ${error.status} ${error.message}`;
        }                
        return throwError(error);
      })
    );
  }

  private handleAuthError() {
    this.authService.logout();    
  }
}
