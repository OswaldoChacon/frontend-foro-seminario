import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge, throwError } from "rxjs";

import { catchError, finalize, map, tap } from "rxjs/operators";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioService } from "../usuario/usuario.service";

export class UsuariosDataSource extends DataSource<Usuario> {
  private usuarios: Usuario[];
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  total: number = 0;
  por_pagina: number = 0;
  constructor(private _usuarioService: UsuarioService) {
    super();
  }


 

  getUsuarios(pagina: number,rol:string,num_control:string ) {
    this.resetData();
    this._usuarioService.getUsuarios(pagina,rol,num_control).pipe(      
      catchError((error) => {
        this.handleError();
        return throwError(error)
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((usuarios) => {
        this.total = usuarios['total'];
        this.por_pagina = usuarios['per_page'];
        this.usuariosSubject.next(usuarios['data']);
        this.usuarios = usuarios['data'];
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<Usuario[]> {
    return this.usuariosSubject.asObservable();
  }

  disconnect() {
    this.usuariosSubject.complete();
    this.loadingSubject.complete();
  }

  handleError() {
    this.usuariosSubject.next(this.usuarios);
    this.loadingSubject.next(false);
  }

  resetData() {
    this.usuariosSubject.next([]);
    this.loadingSubject.next(true);
  }

  editarUsuario(usuario: Usuario, num_control) {
    let index = this.usuarios.findIndex(function (usuario) {
      return usuario.num_control === num_control;
    });
    this.usuarios[index] = usuario;
    this.usuariosSubject.next(this.usuarios);
  }

  getTotalUsuariosPerPage() {
    return this.usuariosSubject?.value?.length;
  }

 
}
