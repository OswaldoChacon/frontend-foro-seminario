import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { jwt_decode } from "jwt-decode";
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: string;
  private roles: string[] = [];
  constructor(private _http: HttpClient,
    private _router: Router) { }
  
  login(form: { num_control: string, password: string }) {
    // http://127.0.0.1:8000/api
    return this._http.post(`/api/login`, form).pipe(
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
    // localStorage.removeItem('token');
    // localStorage.removeItem('profile');
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
  
  forgotPassword(email: string) {
    return this._http.post(`api/forgot_password`, { email: email });
  }
}
