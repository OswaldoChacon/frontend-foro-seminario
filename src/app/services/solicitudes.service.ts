import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../modelos/rol.model';
import { Usuario } from '../modelos/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private _http: HttpClient) { }

  getSolicitudes() {
    return this._http.get<Rol[]>(`api/solicitudes`);
  }

  getregistrarSolicitud() {
    return this._http.get<{solicitudes:Rol[],proyecto:any,docentes:Usuario[]}>(`api/registrar_solicitud`);
  }

  registrarSolicitud(solicitud:any){
    return this._http.post(`api/registrar_solicitud`,solicitud);
  }
}
