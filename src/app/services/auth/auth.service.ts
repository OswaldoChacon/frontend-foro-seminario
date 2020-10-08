import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { jwt_decode } from "jwt-decode";
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from '../formerror/form-error.service';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private roles: string[] = [];

  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _router: Router) { }

  login(form: { num_control: string, password: string }) {
    return this._http.post(`api/login`, form).pipe(
      tap((res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("profile", JSON.stringify(res.profile));
        this.redirectLogin();
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token')
    }
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!(localStorage.getItem('token'))
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  getRoles() {
    this.roles = jwt_decode(localStorage.getItem('token')).roles;
    return this.roles;
  }

  redirectLogin() {
    this.getRoles();
    if (this.roles.includes("Administrador"))
      this._router.navigate(['/Administrador']);
    else if (this.roles.includes("Docente"))
      this._router.navigate(['/Docente']);
    else if (this.roles.includes("Alumno"))
      this._router.navigate(['/Alumno']);
  }

  forgotPassword(form: FormGroup) {
    return this._http.post(`api/forgot_password`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }

  actualizarDatos(form: FormGroup, num_control: string) {
    return this._http.put(`api/actualizar_datos/${num_control}`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    )
  }

  datosPersonales(){
    return this._http.get('api/datos_personales').pipe(
      tap((usuario)=>{
        localStorage.setItem("profile", JSON.stringify(usuario));
      }
      )
    )
  }
  includeTaller() {
    if (this.roles.includes('Taller'))
      return false;
    return true;
  }
}
