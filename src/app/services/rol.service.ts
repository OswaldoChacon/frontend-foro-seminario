import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rol } from 'src/app/modelos/rol.model';
import { catchError, map } from 'rxjs/operators';
import { FormErrorService } from './form-error.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private formError: FormErrorService
  ) { }

  getRoles(url:string) {    
    return this.http.get<Rol[]>(`api/${url}`);
  }

  guardarRol(rol:FormGroup,url:string){    
    return this.http.post(`api/${url}`,rol.value).pipe(
      catchError(error=>{
        return this.formError.handleError(error,rol);
      })
    );
  }

  actualizarRol(rol:string, nombre: FormGroup,url:string){    
    return this.http.put(`api/${url}/${rol}`,nombre.value).pipe(
      catchError(error=>{
        return this.formError.handleError(error,nombre);
      })
    );
  }

  eliminarRol(rol:string,url:string){
    return this.http.delete(`api/${url}/${rol}`);
  }
}
