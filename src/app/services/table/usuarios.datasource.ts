import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";

import { catchError, finalize, map, tap } from "rxjs/operators";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioService } from "../usuario.service";

export class UsuariosDataSource extends DataSource<Usuario> {
  private usuarios: Usuario[];
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);  
  total: number = 0;
  por_pagina: number = 0;

  constructor(private _usuarioService: UsuarioService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Usuario[]> {
    return this.usuariosSubject.asObservable();
  }

  disconnect() {
    this.usuariosSubject.complete();    
  }

  getUsuarios(pagina: number, rol: string, num_control: string) {    
    this._usuarioService.getUsuarios(pagina, rol, num_control).subscribe((usuarios) => {
      this.total = usuarios['total'];
      this.por_pagina = usuarios['per_page'];
      this.usuariosSubject.next(usuarios['data']);
      this.usuarios = usuarios['data'];
    });
  }

  eliminarUsuario(num_control: string) {    
    return this._usuarioService.eliminarUsuario(num_control);
  }
  
}
