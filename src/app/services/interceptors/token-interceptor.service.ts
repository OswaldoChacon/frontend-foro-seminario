import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router) { }

  intercept(req, next){        
    return next.handle(req);
    // let tokenReq = req.clone({
    //   setHeaders:{
    //     Authorization: `Bearer ${this.authService.getToken()}`
    //   }
    // });
    // // 
    // return next.handle(tokenReq).pipe(
    //   catchError(
    //     (err,caught)=>{
    //       if (err.status === 401){
    //         console.log("eliminando token");
    //         this.handleAuthError();
    //         return of(err);
    //     }
    //     throw err;
    //   }
    //   )
    // );
  }
  private handleAuthError() {
    this.authService.logout();    
  }
}
