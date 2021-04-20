import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConceptoDialogComponent } from 'src/app/dialogs/concepto/concepto.component';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';
import { Concepto } from 'src/app/modelos/concepto.model';
import { ConceptoService } from 'src/app/services/conceptos/conceptos.service';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { ConceptosDataSource } from 'src/app/services/table/conceptos.datasource';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
})
export class ConceptosComponent implements OnInit {
  dataSource: ConceptosDataSource = null;
  componentDialog = ConceptoDialogComponent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro', { static: true }) input: ElementRef
  constructor(
    private _activeRoute: ActivatedRoute,
    private _ConceptosService: ConceptoService,
    private _dialog: MatDialog
  ) { }

  columnsHeader = {
    activo: 'Estatus',
    conceptos: 'Concepto',
    ponderacion: 'Ponderacion',
    created_at: 'Fecha de creacion',
    acciones: '',
  };


  ngOnInit() {
    const params = this._activeRoute.snapshot.params;
    if (params) {
      this.dataSource = new ConceptosDataSource(this._ConceptosService, params.id);
      // this.getConceptos();      
    }
  }

  cargarTable(event: { data?: Concepto; opcion?: any; }) {
    if (event.opcion === "Eliminar")
      this.eliminarConcepto(event.data);
    else if (event.opcion === "refresh")
      this.getConceptos();
    else if (event.opcion === 'Activar/Desactivar') {
      console.log("slide")
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getConceptos();
      })
    ).subscribe();

    this.paginator.page.pipe(tap(() => {
      this.getConceptos();
    })
    ).subscribe();
    this.getConceptos();
  }

  getConceptos() {
    this.dataSource.getConceptos(
      this.paginator.pageIndex + 1,
      this.input.nativeElement.value
    );
  }

  eliminarConcepto(Concepto: Concepto) {
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarConcepto(Concepto.id).subscribe(() => this.getConceptos());
    })

  }


  ngOnDestroy(): void {
    localStorage.removeItem('grupo_id');
  }

}
