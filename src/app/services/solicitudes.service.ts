import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../modelos/rol.model';
import { Usuario } from '../modelos/usuario.model';
import { FormErrorService } from './formerror/form-error.service';
import { catchError } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  constructor(private _http: HttpClient,
    private _formError: FormErrorService
    ) { }

  getSolicitudes() {
    return this._http.get<Rol[]>(`api/solicitudes`);
  }

  getregistrarSolicitud() {
    return this._http.get<{ solicitudes: Rol[], proyecto: any, docentes: Usuario[] }>(`api/registrar_solicitud`);
  }

  registrarSolicitud(form: FormGroup) {
    return this._http.post(`api/registrar_solicitud`, form.value).pipe(
      catchError(error=>{
        return this._formError.handleError(error,form)
      })
    );
  }
}
