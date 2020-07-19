import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
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
import { UsuarioDataSource } from "src/app/services/table/usuario.datasource";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { RolesService } from 'src/app/services/rol/rol.service';
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  columnsHeader = {
    'acceso': 'Estatus',
    'nombreCompleto': 'Nombre completo',
    'email': 'Email',
    'acciones': ''
  };
  roles: any;
  componentDialog = UsuarioDialogComponent;
  dataSource: UsuarioDataSource = null;
  rolSeleccionado: string = 'Todos';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro') input: ElementRef

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolesService,
    private _dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.dataSource = new UsuarioDataSource(this._usuarioService);
    this._rolService.getRoles().subscribe(res => this.roles = res);
  }

  seleccionarRol(rolSeleccionado: string) {
    this.dataSource.resetData();
    this.rolSeleccionado = rolSeleccionado;
    this.dataSource.getUsuarios(1, this.rolSeleccionado, this.input.nativeElement.value);
  }
  cargarTable(event: {data:Usuario, opcion?:any, valorOpcion?:string}) {
    if(event.opcion === 'Eliminar')
      this.eliminarUsuario(event.data.num_control);
    if(event.opcion instanceof MatCheckboxChange)
      this.agregarRol(event.opcion,event.data,event.valorOpcion);
    // if(event.opcion === 'Agregar rol')      
    //   this.agregarRol()
    console.log(event);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.dataSource.resetData();
        this.paginator.pageIndex = 0;
        this.dataSource.getUsuarios(this.paginator.pageIndex + 1, this.rolSeleccionado, this.input.nativeElement.value);
      })
    ).subscribe();

    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.dataSource.getUsuarios(this.paginator.pageIndex + 1, this.rolSeleccionado, this.input.nativeElement.value);
      })
    ).subscribe();
    this.dataSource.getUsuarios(1, this.rolSeleccionado, this.input.nativeElement.value);

  }

  agregarUsuario(): void {
    let dialogRef = this._dialog.open(UsuarioDialogComponent);
    dialogRef.afterClosed().pipe(
      takeWhile(res => res != 1),
      tap(() => this.dataSource.resetData()),
    ).subscribe(() => this.dataSource.getUsuarios(1, this.rolSeleccionado, this.input.nativeElement.value));
  }

  editarUsuario(usuario: Usuario) {
    let dialogRef = this._dialog.open(UsuarioDialogComponent, {
      data: usuario,
    });
    dialogRef.afterClosed().pipe(
      takeWhile(res => res != 1),
      tap(() => this.dataSource.resetData())
    ).subscribe(() => this.dataSource.getUsuarios(1, this.rolSeleccionado, this.input.nativeElement.value));
  }

  eliminarUsuario(num_control: string) {
    this.dataSource.resetData();
    this._usuarioService.eliminarUsuario(num_control).pipe(
      catchError((error) => {
        this.dataSource.handleError();
        return throwError(error);
      }),
    ).subscribe(() => this.dataSource.getUsuarios(1, this.rolSeleccionado, this.input.nativeElement.value));
  }

  agregarRol(event: MatCheckboxChange, user: Usuario, rol: string) {
    const rolSelected = user.roles.find((Users) => Users.nombre === rol);
    rolSelected.is = !rolSelected.is;
    if (event.checked)
      this._usuarioService.agregarRol(user.num_control, rol).pipe(
        catchError((error) => {
          rolSelected.is = !rolSelected.is;
          return throwError(error);
        })
      ).subscribe();
    else
      this._usuarioService.eliminarRol(user.num_control, rol).pipe(
        catchError((error) => {
          rolSelected.is = !rolSelected.is;
          return throwError(error)
        })
      ).subscribe();
  }
}
