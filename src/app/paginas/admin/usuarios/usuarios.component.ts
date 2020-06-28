import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsersService } from "src/app/services/usuarios/users.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { Subject, of, throwError, fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  tap,
  catchError,
  takeWhile,
} from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { UsuarioDialogComponent } from "src/app/dialogs/usuario/usuario.dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { UsuarioDataSource } from "src/app/services/table/user.datasource";
import { MatRadioChange } from "@angular/material/radio";
import { MatCheckboxChange } from "@angular/material/checkbox";
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [
    'num_control',
    'nombre',
    'apellidoP',
    'apellidoM',
    'email',
    'acciones',
  ];
  dataSource: UsuarioDataSource = null;

  options = [
    { nombre: "Alumnos" },
    { nombre: "Maestros" },
    { nombre: "Confirmados" },
    { nombre: "No confirmados" },
  ];

  private searchTerms = new Subject<string>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro') input: ElementRef

  constructor(
    private usersServices: UsersService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.dataSource = new UsuarioDataSource(this.usersServices);
    this.dataSource.getUsuarios(1);
    this.searchTerms.pipe(
      tap(() => this.dataSource.resetData()),
      debounceTime(5000),
      distinctUntilChanged(),
      tap((num_control) => this.dataSource.buscarUsuarios(num_control))
    ).subscribe();
  }

  filtros(event: MatRadioChange) {
    this.dataSource.filtro("confirmado", 0);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.dataSource.buscarUsuarios(this.input.nativeElement.value);
        })
      ).subscribe();

    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.dataSource.getUsuarios(this.paginator.pageIndex + 1);
      })
    ).subscribe();
  }

  agregarUsuario(): void {
    let dialogRef = this.dialog.open(UsuarioDialogComponent);
    dialogRef.afterClosed().pipe(
      takeWhile(res => res != 1),
      tap(() => this.dataSource.resetData()),
    ).subscribe(() => this.dataSource.getUsuarios(this.paginator.pageIndex + 1));
  }

  editarUsuario(usuario: Usuario) {
    let dialogRef = this.dialog.open(UsuarioDialogComponent, {
      data: usuario,
    });
    dialogRef.afterClosed().pipe(
      takeWhile(res => res != 1),
      tap(() => this.dataSource.resetData())
    ).subscribe(() => this.dataSource.getUsuarios(this.paginator.pageIndex + 1));
  }

  eliminarUsuario(id: string) {
    this.dataSource.resetData();
    this.usersServices.eliminarUsuario(id).pipe(
        catchError((error) => {
          this.dataSource.handleError();
          return throwError(error);
        }),
      ).subscribe(() => this.dataSource.getUsuarios(this.paginator.pageIndex + 1));
  }

  agregarRol(event: MatCheckboxChange, user: Usuario, rol: string) {
    let rolSelected = user.roles.find((Users) => Users.nombre === rol);
    rolSelected.is = !rolSelected.is;
    if (event.checked)
      this.usersServices.agregarRol(user.num_control, rol).pipe(
        catchError((error) => {
          rolSelected.is = !rolSelected.is;
          return throwError(error);
        })
      ).subscribe();
    else
      this.usersServices.eliminarRol(user.num_control, rol).pipe(
        catchError((error) => {
          rolSelected.is = !rolSelected.is;
          return throwError(error)
        })
      ).subscribe();
  }
}
