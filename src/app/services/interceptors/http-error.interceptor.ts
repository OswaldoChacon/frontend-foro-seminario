import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, tap, finalize } from "rxjs/operators";
import { ToastService } from '../toast/toast.service';
import { AuthService } from '../auth/auth.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private _toastr: ToastService,
    private _authService: AuthService,
    private _spinner: NgxSpinnerService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    let tokenReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    });
    this._spinner.show();
    return next.handle(tokenReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.status !== 204) {
            if (event.body.message)
              this._toastr.showToastOk(event.body.message, '');
          }
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401)
            this.handleAuthError();
          else if (error.status >= 500)
            this._toastr.showToastError('Inténtelo de nuevo', 'Ha ocurrido un error con el servidor');
          else if (error.error.message)
            this._toastr.showToastError(error.error.message, '');
        }
        return throwError(error);
      }),
      finalize(() => {
        this._spinner.hide();
      }
      )
    );
  }

  private handleAuthError() {
    this._authService.logout();
  }
}
