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
}
