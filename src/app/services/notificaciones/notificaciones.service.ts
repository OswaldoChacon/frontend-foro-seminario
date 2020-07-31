import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(
    private _http: HttpClient
  ) { }
  miSolicitud()
  {
    return this._http.get(`api/miSolicitud`);
  }
}
