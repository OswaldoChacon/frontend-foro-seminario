import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Usuario } from "../modelos/usuario.model";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormErrorService } from './form-error.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private _http: HttpClient,
    private _formError: FormErrorService,
    private _router: Router
  ) {
  }

  getUsuarios(pagina: number, rol: string, num_control: string) {
    return this._http.get('/api/usuarios', {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('rol', rol)
        .set('num_control', num_control)
    });
  }

  guardarUsuario(form: FormGroup) {
    const rol = this._router.url.includes("Docente") ? "Docente" : null;
    return this._http.post(`api/usuarios`, form.value,{
      params: new HttpParams().set('rol',rol)
    }).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }

  actualizarUsuario(num_control: string, form: FormGroup) {
    return this._http.put(
      `api/usuarios/${num_control}`,
      form.value
    ).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );
  }

  eliminarUsuario(num_control: string) {
    return this._http.delete(`api/usuarios/${num_control}`);
  }

  agregarRol(usuario: Usuario, rol: string, rolSelected: any) {
    rolSelected.is = !rolSelected.is;
    return this._http.post(`api/agregar_rol`, {
      rol: rol,
      num_control: usuario.num_control
    }).pipe(catchError((error) => {
      rolSelected.is = !rolSelected.is;
      return throwError(error);
    })
    );
  }

  eliminarRol(usuario: Usuario, rol: string, rolSelected: any) {
    rolSelected.is = !rolSelected.is;
    return this._http.delete(`api/eliminar_rol/${usuario.num_control}`, {
      params: new HttpParams().set("rol", rol),
    }).pipe(catchError((error) => {
      rolSelected.is = !rolSelected.is;
      return throwError(error);
    })
    );
  }

  cambiarPassword(form: FormGroup) {
    return this._http.put(`api/cambiar_contrasena`, form.value).pipe(
      catchError(error => {
        return this._formError.handleError(error, form);
      })
    );;
  }

  getDocentes() {
    return this._http.get<Usuario[]>(`api/alumno/docentes`);
  }

  // tal vez no deberia estar aqui
  getAlumnos() {
    return this._http.get<Usuario[]>(`api/lista_alumnos`);
  }
}
