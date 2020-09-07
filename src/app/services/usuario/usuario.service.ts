import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
} from "@angular/common/http";
import { Usuario } from "../../modelos/usuario.model";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  constructor(private _http: HttpClient) {
  }

  getUsuarios(pagina: number, rol: string, num_control: string) {
    return this._http.get('/api/usuarios', {
      params: new HttpParams()
        .set('page', pagina.toString())
        .set('rol', rol)
        .set('num_control', num_control)
    });
  }

  guardarUsuario(user: Usuario) {
    return this._http.post(`api/usuarios`, user);
  }

  agregarRol(num_control: string, rol: string) {
    return this._http.put(`api/agregar_rolUsuario/${num_control}`, {
      rol: rol,
    });
  }

  eliminarRol(num_control: string, rol: string) {
    return this._http.delete(`api/eliminar_rolUsuario/${num_control}`, {
      params: new HttpParams().set("rol", rol),
    });
  }

  actualizarUsuario(num_control: string, user: Usuario) {
    return this._http.put(
      `api/usuarios/${num_control}`,
      user
    );
  }

  eliminarUsuario(num_control: string) {
    return this._http.delete(`api/usuarios/${num_control}`);
  }

  cambiarPassword(data: {password:string,nuevo_password:string}){
    return this._http.put(`api/cambiar_contrasena`,data);
  }

  getDocentes(){
    return this._http.get<Usuario[]>(`api/docentes`);
  }
}
