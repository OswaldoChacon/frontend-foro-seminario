import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { MatPaginator } from "@angular/material/paginator";
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
import { RolesService } from "src/app/services/rol/rol.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {
  columnsHeader = {
    acceso: "Estatus",
    num_control: "No. Control",
    nombreCompleto: "Nombre completo",
    email: "Email",
    acciones: "",
  };
  roles: string[] = ['Todos']
  componentDialog = UsuarioDialogComponent;
  dataSource: UsuariosDataSource = null;
  rolSeleccionado: string = 'Todos';


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("inputFiltro", { static: true }) input: ElementRef;

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolesService
  ) { }

  ngOnInit(): void {
    this.dataSource = new UsuariosDataSource(this._usuarioService);
    this._rolService.getRoles("roles").pipe(map(roles => {
      return roles.map(rolesName => rolesName.nombre_)
    })
    ).subscribe((roles) => {
      this.roles.push(...roles);
    });
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
    fromEvent(this.input.nativeElement, "keyup").pipe(debounceTime(150),
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
    this.dataSource.eliminarUsuario(usuario.num_control).subscribe(()=>this.getUsuarios());    
  }

  agregarRol(event: MatCheckboxChange, usuario: Usuario, rol: string) {
    const rolSelected = usuario.roles.find((roles) => roles.nombre_ === rol);    
    if (event.checked)
      this._usuarioService.agregarRol(usuario, rol, rolSelected).subscribe();
    else
      this._usuarioService.eliminarRol(usuario, rol, rolSelected).subscribe();
  }
  
}
