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
import { ToastService } from '../toast/toast.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _toastr: ToastService,
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
          // if(event.body)
            this._toastr.showToastOk(event.body.message,"");            
        }
      }),
      catchError(error => {        
        if (error instanceof HttpErrorResponse) {  
          if(error.status === 401)
            this.handleAuthError();
          if(error.status > 500)
            this._toastr.showToastError(error.error,"");
          if(error.error.message)
            this._toastr.showToastError(error.error.message,"");         
        } else {
          // backend error
          // mensaje = `Server-side error: ${error.status} ${error.message}`;
        }           
        this.router.navigate(['home']);
        return throwError(error);
      })
    );
  }

  private handleAuthError() {
    this.authService.logout();    
  }
}
