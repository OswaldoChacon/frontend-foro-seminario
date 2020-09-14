import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from 'src/app/modelos/rol.model';
import { catchError, map } from 'rxjs/operators';
import { FormErrorService } from '../formerror/form-error.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private _http: HttpClient,
    private _formError: FormErrorService
  ) { }

  getRoles(url:string) {    
    return this._http.get<Rol[]>(`api/${url}`);
  }

  guardarRol(rol:FormGroup,url:string){    
    return this._http.post(`api/${url}`,rol.value).pipe(
      catchError(error=>{
        return this._formError.handleError(error,rol);
      })
    );
  }

  actualizarRol(rol:string, nombre: FormGroup,url:string){    
    return this._http.put(`api/${url}/${rol}`,nombre.value).pipe(
      catchError(error=>{
        return this._formError.handleError(error,nombre);
      })
    );
  }

  eliminarRol(rol:string,url:string){
    return this._http.delete(`api/${url}/${rol}`);
  }
}
