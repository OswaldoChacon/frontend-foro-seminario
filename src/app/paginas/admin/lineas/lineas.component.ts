import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Linea } from 'src/app/modelos/linea.model';

import { LineaService } from 'src/app/services/linea/linea.service';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { fromEvent, BehaviorSubject, Observable, merge, throwError } from 'rxjs';
import { map, catchError, finalize, takeWhile, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LineaDialogComponent } from 'src/app/dialogs/linea/linea.dialog.component';
import { LineaDataSource } from 'src/app/services/table/lineas.datasource';


@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  columnasTabla = ['clave', 'nombre', 'acciones'];
  columnHeader = {'clave': 'Clave', 'nombre': 'Nombre', 'acciones': 'Acciones'};
  dataSource: LineaDataSource = null;
  componentDialog = LineaDialogComponent;
  constructor(
    private _LineaService: LineaService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new LineaDataSource(this._LineaService);
    this.dataSource.getLineas();
    // console.log(this.dataSource);
  }

  agregarLinea() {
    let dialogRef = this._dialog.open(LineaDialogComponent);
    dialogRef.afterClosed().pipe(
      takeWhile(res => res != 1),
      tap(() => this.dataSource.resetData()),
      finalize(() => this.dataSource.getLineas())
    ).subscribe();
  }

  editarLinea(linea: Linea) {
    let dialogRef = this._dialog.open(LineaDialogComponent, {
      data: linea
    });
    dialogRef.afterClosed().pipe(
      takeWhile(res=>res!=1),
      tap(()=>this.dataSource.resetData()),
      finalize(()=>this.dataSource.getLineas())
    ).subscribe();
  }

  eliminarLinea(linea: Linea) {
    this.dataSource.resetData();
    this._LineaService.eliminarLinea(linea.clave).pipe(      
      catchError((error) => {
        this.dataSource.handleError();
        return throwError(error);
      }),
      // finalize(() => )
    ).subscribe(() => this.dataSource.getLineas());    
  }
}
