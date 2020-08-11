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

  getRoles() {
    return this._http.get<Rol[]>(`api/roles`);
  }

  agregarRol(rol:string){
    return this._http.post(`api/agregar_rol`,{nombre:rol});
  }

  actualizarRol(rol:string, nombre:string){
    return this._http.put(`api/actualizar_rol/${rol}`,{rol:nombre});
  }

  eliminarRol(rol:string){
    return this._http.delete(`api/eliminar_rol/${rol}`);
  }
}
