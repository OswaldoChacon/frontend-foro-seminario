import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from 'src/app/modelos/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private _http: HttpClient
  ) { }

  getRoles(url:string) {
    return this._http.get<Rol[]>(`api/${url}`);
  }

  guardarRol(rol:Rol,url:string){
    // return this._http.post(`api/agregar_rol`,{nombre:rol});
    return this._http.post(`api/agregar_${url}`,rol);
  }

  actualizarRol(rol:string, nombre:Rol,url:string){
    // return this._http.put(`api/actualizar_rol/${rol}`,{rol:nombre});
    return this._http.put(`api/actualizar_${url}/${rol}`,nombre);
  }

  eliminarRol(rol:string,url:string){
    return this._http.delete(`api/eliminar_${url}/${rol}`);
  }
}
