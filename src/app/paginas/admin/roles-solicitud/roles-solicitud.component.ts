import { Component, OnInit } from '@angular/core';
import { RolesDataSource } from '../../../services/table/roles.datasource';
import { RolesService } from 'src/app/services/rol/rol.service';
import { SolicitudesDataSource } from 'src/app/services/table/solicitudes.datasource';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { RolesDialogComponent } from 'src/app/dialogs/roles/roles.dialog.component';
@Component({
  selector: 'app-roles-solicitud',
  templateUrl: './roles-solicitud.component.html',
  styleUrls: ['./roles-solicitud.component.css']
})
export class RolesSolicitudComponent implements OnInit {

  rolesDataSource: RolesDataSource;
  solicitudesDataSource: SolicitudesDataSource;
  columnsHeader= {nombre:'Nombre',acciones:''}
  componentDialog = RolesDialogComponent;
  constructor(
    private _rolService: RolesService,
    private _solicitudesService: SolicitudesService
  ) { }

  ngOnInit(): void {
    this.rolesDataSource= new RolesDataSource(this._rolService);
    this.solicitudesDataSource = new SolicitudesDataSource(this._solicitudesService);
    this.rolesDataSource.getRoles();
    this.solicitudesDataSource.getSolicitudes();

  }

}
