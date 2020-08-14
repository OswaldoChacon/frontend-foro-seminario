import { Component, OnInit } from '@angular/core';
import { RolesDataSource } from '../../../services/table/roles.datasource';
import { RolesService } from 'src/app/services/rol/rol.service';
import { SolicitudesDataSource } from 'src/app/services/table/solicitudes.datasource';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { RolesDialogComponent } from 'src/app/dialogs/roles/roles.dialog.component';
import { Router } from '@angular/router';
import { Rol } from 'src/app/modelos/rol.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-roles-solicitud',
  templateUrl: './roles-solicitud.component.html',
  styleUrls: ['./roles-solicitud.component.css']
})
export class RolesSolicitudComponent implements OnInit {

  dataSource: RolesDataSource;
  solicitudesDataSource: SolicitudesDataSource;
  columnsHeader = { nombre_: 'Nombre', acciones: '' }
  url: string;
  componentDialog = RolesDialogComponent;

  constructor(
    private _rolService: RolesService,
    private _solicitudesService: SolicitudesService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.url = this._router.url.includes('roles') ? 'roles' : 'solicitudes';
    this.dataSource = new RolesDataSource(this._rolService);
    // this.solicitudesDataSource = new SolicitudesDataSource(this._solicitudesService);
    this.dataSource.getRoles(this.url);
    // this.solicitudesDataSource.getSolicitudes();

  }

  cargarTable(event: { data?: Rol, opcion?: string, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getRoles(this.url)
    if (event.opcion === 'Eliminar')
      this.eliminarRol(event.data);
    console.log(event);
  }

  eliminarRol(rol: Rol) {
    this.dataSource.resetData();
    this._rolService.eliminarRol(rol.nombre_, this.url).pipe(
      catchError((error) => {
        this.dataSource.handleError();
        return throwError(error);
      }),
      // finalize(() => )
    ).subscribe(() => this.dataSource.getRoles(this.url));
  }

}
