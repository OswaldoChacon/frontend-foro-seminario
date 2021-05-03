import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { MatPaginator } from "@angular/material/paginator";
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  map,
} from "rxjs/operators";
import { UsuarioDialogComponent } from "src/app/dialogs/usuario/usuario.dialog.component";
import { UsuariosDataSource } from "src/app/services/table/usuarios.datasource";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { RolesService } from "src/app/services/rol.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  columnsHeader = {
    acceso: 'Estatus',
    num_control: 'No. Control',
    nombreCompleto: 'Nombre completo',
    email: 'Email',
    acciones: '',
  };
  roles: string[] = [];
  componentDialog = UsuarioDialogComponent;
  dataSource: UsuariosDataSource = null;
  rolSeleccionado: string;
  misRoles: string[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("inputFiltro", { static: true }) input: ElementRef;

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolesService,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new UsuariosDataSource(this._usuarioService);
    this.misRoles = this._authService.getRoles();
    if (this.misRoles.includes("administrador")) {
      this.rolSeleccionado = 'Todos';
      this.roles.push('Todos', 'Usuarios sin rol');
      this._rolService.getRoles("roles").pipe(map(roles => {
        return roles.map(rolesName => rolesName.nombre_)
      })
      ).subscribe((roles) => {
        this.roles.push(...roles);
      });
    }
    else if (this.misRoles.includes("Taller")) {
      this.roles.push('Alumno');
      this.rolSeleccionado = 'Alumno';
    }
  }

  seleccionarRol(rolSeleccionado: string) {
    this.rolSeleccionado = rolSeleccionado;
    this.paginator.pageIndex = 0;
    this.getUsuarios();
  }

  cargarTable(event: { data?: Usuario; opcion?: any; valorOpcion?: string }) {
    if (event.opcion === "Eliminar")
      this.eliminarUsuario(event.data);
    if (event.opcion instanceof MatCheckboxChange)
      this.agregarRol(event.opcion, event.data, event.valorOpcion);
    if (event.opcion === "refresh")
      this.getUsuarios();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, "keyup").pipe(debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getUsuarios();
      })
    ).subscribe();

    this.paginator.page.pipe(tap(() => {
      this.getUsuarios();
    })
    ).subscribe();
    this.getUsuarios();
  }

  getUsuarios() {
    this.dataSource.getUsuarios(
      this.paginator.pageIndex + 1,
      this.rolSeleccionado,
      this.input.nativeElement.value
    );
  }

  eliminarUsuario(usuario: Usuario) {    
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarUsuario(usuario.num_control).subscribe(() => this.getUsuarios());
    });
  }

  agregarRol(event: MatCheckboxChange, usuario: Usuario, rol: string) {
    const rolSelected = usuario.roles.find((roles) => roles.nombre_ === rol);
    if (event.checked)
      this._usuarioService.agregarRol(usuario, rol, rolSelected).subscribe();
    else
      this._usuarioService.eliminarRol(usuario, rol, rolSelected).subscribe();
  }

}
