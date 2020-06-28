import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge, throwError } from "rxjs";

import { catchError, finalize, map } from "rxjs/operators";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsersService } from "../usuarios/users.service";

export class UsuarioDataSource extends DataSource<Usuario> {
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private usuarios: Usuario[];
  total: number = 0;
  por_pagina: number = 0;
  constructor(private userService: UsersService) {
    super();
  }


  confirmados() {
    this.userService
      .confirmados()
      .subscribe((res) => this.usuariosSubject.next(res));
  }

  getUsuarios(pagina: number) {
    this.userService.getUsuarios(pagina).pipe(
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
  
  buscarUsuarios(num_control: string) {
    this.resetData();
    if (!num_control.trim()) {
      this.getUsuarios(0);
    } else {
      this.userService
        .buscarUsuarios(num_control)
        .pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((usuarios) => {                    
          this.usuariosSubject.next(usuarios);          
          this.total = usuarios.length;          
        });
    }
  }

  getTotalUsuariosPerPage() {
    return this.usuariosSubject?.value?.length;
  }

  filtro(filtro, valorFiltro) {
    this.usuariosSubject.next([]);
    this.loadingSubject.next(true);
    this.userService
      .filtrado(filtro, valorFiltro)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((lessons) => {
        this.total = lessons['total'];
        this.por_pagina = lessons['per_page'];
        this.usuariosSubject.next(lessons);
        this.usuarios = lessons['data'];
      });
  }
}
