import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Linea } from 'src/app/modelos/linea.model';

import { LineaService } from 'src/app/services/linea/linea.service';

import { fromEvent, BehaviorSubject, Observable, merge, throwError } from 'rxjs';
import { map, catchError, finalize, takeWhile, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LineaDialogComponent } from 'src/app/dialogs/linea/linea.dialog.component';
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
  title:string
  constructor(
    private _LineaService: LineaService,
    private _router: Router,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.title = this._router.url.includes('lineas-investigacion') ? 'Lineas de investigacion' : 'Tipos de proyecto';
    this.url = this._router.url.includes('lineas-investigacion') ? 'lineas' : 'tiposProyecto';
    console.log(this.url);
    this.dataSource = new LineaDataSource(this._LineaService);
    this.dataSource.getLineas(this.url);
    // console.log(this.dataSource);
  }

  cargarTable(event: { data?: Linea, opcion?: string, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getLineas(this.url)
    if (event.opcion === 'Eliminar')
      this.eliminarLinea(event.data);
    console.log(event);
  }



  eliminarLinea(linea: Linea) {
    this.dataSource.resetData();
    this._LineaService.eliminarLinea(linea.clave,this.url).pipe(
      catchError((error) => {
        this.dataSource.handleError();
        return throwError(error);
      }),
      // finalize(() => )
    ).subscribe(() => this.dataSource.getLineas(this.url));
  }
}
