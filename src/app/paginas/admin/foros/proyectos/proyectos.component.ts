import { Component, OnInit, ViewChild, Optional, Inject, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProyectosDataSource } from "src/app/services/table/proyectos.datasource";
import { MatPaginator } from "@angular/material/paginator";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";
import { MatDialog } from "@angular/material/dialog";
import { Proyecto } from "src/app/modelos/proyecto.model";
import { fromEvent } from 'rxjs';
import { DocentesSheetComponent } from '../../bottomsheets/docentes/docentes.sheet.component';


@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.css"],
})
export class ProyectosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro', { static: true }) input: ElementRef
  constructor(
    private _activeRoute: ActivatedRoute,
    private _proyectoService: ProyectosService,
    private _dialog: MatDialog
  ) { }

  displayedColumns = ["folio", "titulo", "participa"];
  columnsHeader = { 'participa': 'Part.', 'folio': 'Folio', 'titulo': 'Titulo' };
  // componentDialog = DocentesDiaogComponent;
  componentDialog = DocentesSheetComponent;
  dataSource: ProyectosDataSource;
  filtroElegido: string = 'Aceptados'
  opciones: string[]=['Aceptados','No aceptados'];

  ngOnInit(): void {
    const params = this._activeRoute.snapshot.params;
    if (params) {
      this.dataSource = new ProyectosDataSource(this._proyectoService, params.id);
      this.dataSource.getProyectos(1, this.input.nativeElement.value, this.filtroElegido);
    }
  }

  seleccionarFiltro(filtro: string) {
    // this.filtro = filtro;    
    this.getProyectos();
  }

  cargarTable(event: { data?: Proyecto, opcion?: any, valorOpcion?: string }) {
    if (event.opcion instanceof MatCheckboxChange)
      this.participa(event.opcion, event.data.folio)
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getProyectos();
      })
    ).subscribe();

    this.paginator.page.pipe(
      tap(() => {
        this.dataSource.resetData();
        this.getProyectos();
      })
    ).subscribe();
  }

  getProyectos() {
    this.dataSource.getProyectos(this.paginator.pageIndex + 1, this.input.nativeElement.value, this.filtroElegido);    
  }

  participa(event: MatCheckboxChange, folio: string) {
    let participa = event.checked == true ? "1" : "0";
    this._proyectoService.participa(folio, participa).subscribe();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('docentes');
  }
}
