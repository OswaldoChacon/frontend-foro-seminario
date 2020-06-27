import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { tap, catchError, map } from "rxjs/operators";
import {
  Observable,
  throwError,
  BehaviorSubject,
  of,
  Subject,
  ReplaySubject,
} from "rxjs";
import { Usuario } from "../../modelos/usuario.model";
// import { AdminModule } from 'src/app/admin/admin.module';

@Injectable({
  providedIn: "root",
  // AdminModule
})
export class UsersService {
  constructor(private http: HttpClient) {    
  }  

  getUsuarios(pagina) {
    return this.http.get("/api/usuarios", {
      params: new HttpParams().set("page", pagina),
    });
  }

  guardarUsuario(user: Usuario) {
    return this.http.post(`api/registrar_usuario`, user);
  }

  agregarRol(num_control: string, rol: string) {
    return this.http.put(`api/agregar_rol/${num_control}`, {
      rol: rol,
    });
  }

  eliminarRol(num_control: string, rol: string) {
    return this.http.delete(`api/eliminar_rol/${num_control}`, {
      params: new HttpParams().set("rol", rol),
    });
  }
  
  buscarUsuarios(num_control) {
    return this.http.get<Usuario[]>(
      `api/buscar_usuarios/${num_control}`
    );
  }

  confirmados() {
    return this.http.get<Usuario[]>(`api/usuarios/confirmados`);
  }

  filtrado(filtro, valorFiltro) {
    return this.http.get<Usuario[]>(
      `api/buscar_usuarios/${filtro}/${valorFiltro}`
    );
  }

  actualizarUsuario(num_control: string, user) {
    return this.http.put(
      `api/actualizar_usuario/${num_control}`,
      user
    );
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`api/eliminar_usuario/${id}`);
  }
}
