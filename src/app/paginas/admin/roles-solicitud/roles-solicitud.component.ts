import { Component, OnInit } from '@angular/core';
import { RolesDataSource } from '../../../services/table/roles.datasource';
import { RolesService } from 'src/app/services/rol/rol.service';
import { RolesDialogComponent } from '../dialogs/roles/roles.dialog.component';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';

@Component({
  selector: 'app-roles-solicitud',
  templateUrl: './roles-solicitud.component.html',
  styleUrls: ['./roles-solicitud.component.css']
})
export class RolesSolicitudComponent implements OnInit {

  dataSource: RolesDataSource;
  columnsHeader = { 'nombre_': 'Nombre', acciones: '' }
  url: string;
  title: string;
  componentDialog = RolesDialogComponent;

  constructor(
    private _rolService: RolesService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.title = this._router.url.includes('roles') ? 'Roles' : 'Tipos de solicitud';
    this.url = this._router.url.includes('roles') ? 'roles' : 'solicitudes';
    this.dataSource = new RolesDataSource(this._rolService);
    this.dataSource.getRoles(this.url);
  }

  cargarTable(event: { data?: Rol, opcion?: string, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getRoles(this.url)
    if (event.opcion === 'Eliminar')
      this.eliminarRol(event.data);
  }

  eliminarRol(rol: Rol) {
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarRoles(rol, this.url).subscribe(() => this.dataSource.getRoles(this.url));
    });

  }

}
