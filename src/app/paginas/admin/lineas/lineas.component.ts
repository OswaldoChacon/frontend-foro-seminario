import { Component, OnInit } from '@angular/core';
import { Linea } from 'src/app/modelos/linea.model';
import { LineaService } from 'src/app/services/linea.service';
import { LineaDialogComponent } from '../dialogs/linea/linea.dialog.component';
import { LineaDataSource } from 'src/app/services/table/lineas.datasource';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})

export class LineasComponent implements OnInit {
  columnHeader = { 'clave': 'Clave', 'nombre': 'Nombre', 'acciones': '' };
  dataSource: LineaDataSource = null;
  componentDialog = LineaDialogComponent;
  url: string;
  title: string;

  constructor(
    private _lineaService: LineaService,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.title = this._router.url.includes('lineas-investigacion') ? 'Lineas de investigacion' : 'Tipos de proyecto';
    this.url = this._router.url.includes('lineas-investigacion') ? 'lineas' : 'tiposProyecto';
    this.dataSource = new LineaDataSource(this._lineaService);
    this.dataSource.getLineas(this.url);
  }

  cargarTable(event: { data?: Linea, opcion?: string, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getLineas(this.url)
    if (event.opcion === 'Eliminar')
      this.eliminarLinea(event.data);
  }

  eliminarLinea(linea: Linea) {
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarLinea(linea, this.url).subscribe(() => this.dataSource.getLineas(this.url));
    });

  }
}
