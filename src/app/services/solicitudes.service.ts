import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../modelos/rol.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private _http: HttpClient) { }

  getSolicitudes(){
    return this._http.get<Rol[]>(`api/solicitudes`);
  }
}
