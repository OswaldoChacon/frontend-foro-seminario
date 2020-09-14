import { Component, OnInit } from '@angular/core';
import { Linea } from 'src/app/modelos/linea.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { LineaDialogComponent } from '../dialogs/linea/linea.dialog.component';
import { LineaDataSource } from 'src/app/services/table/lineas.datasource';
import { Router } from '@angular/router';

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
    this.dataSource.eliminarLinea(linea, this.url).subscribe(() => this.dataSource.getLineas(this.url));
  }
}
