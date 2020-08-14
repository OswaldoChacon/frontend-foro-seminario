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
import { UsuariosDataSource } from "src/app/services/table/usuarios.datasource";
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
    'num_control':'No. Control',
    'nombreCompleto': 'Nombre completo',
    'email': 'Email',
    'acciones': ''
  };
  roles: any;
  componentDialog = UsuarioDialogComponent;
  dataSource: UsuariosDataSource = null;
  rolSeleccionado: string = 'Todos';
  // rolSeleccionado: string = '';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro', { static: true }) input: ElementRef

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolesService,    
  ) { }


  ngOnInit(): void {
    this.dataSource = new UsuariosDataSource(this._usuarioService);
    this._rolService.getRoles('roles').subscribe(res => this.roles = res);
  }

  seleccionarRol(rolSeleccionado: string) {
    this.rolSeleccionado = rolSeleccionado;
    this.paginator.pageIndex = 0;    
    this.getUsuarios();
  }
  cargarTable(event: { data?: Usuario, opcion?: any, valorOpcion?: string }) {
    console.log(event);
    if (event.opcion === 'Eliminar')
      this.eliminarUsuario(event.data.num_control);
    if (event.opcion instanceof MatCheckboxChange)
      this.agregarRol(event.opcion, event.data, event.valorOpcion);
    if (event.opcion === 'refresh')
      this.getUsuarios();    
    console.log(event);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {        
        this.paginator.pageIndex = 0;        
        this.getUsuarios();
      })
    ).subscribe();

    this.paginator.page.pipe(
      tap(() => {        
        this.getUsuarios();        
      })
    ).subscribe();
    this.getUsuarios();    

  } 

  eliminarUsuario(num_control: string) {    
    this.dataSource.resetData();
    this._usuarioService.eliminarUsuario(num_control).pipe(
      catchError((error) => {
        this.dataSource.handleError();
        return throwError(error);
      }),
    ).subscribe(() => this.getUsuarios());
  }

  getUsuarios() {
    this.dataSource.getUsuarios(
      this.paginator.pageIndex + 1,
      this.rolSeleccionado,
      this.input.nativeElement.value);
  }

  agregarRol(event: MatCheckboxChange, user: Usuario, rol: string) {
    const rolSelected = user.roles.find((roles) => roles.nombre_ === rol);    
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
