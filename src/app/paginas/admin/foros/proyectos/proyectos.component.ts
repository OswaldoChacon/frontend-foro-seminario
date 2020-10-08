import { Component, OnInit, ViewChild, Optional, Inject, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProyectosDataSource } from "src/app/services/table/proyectos.datasource";
import { MatPaginator } from "@angular/material/paginator";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";
import { Proyecto } from "src/app/modelos/proyecto.model";
import { fromEvent } from 'rxjs';
import { DocentesDiaogComponent } from '../../dialogs/docentes/docentes.dialog.component';

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
  ) { }

  displayedColumns = ["folio", "titulo", "participa"];
  columnsHeader = { 'participa': 'Part.', 'folio': 'Folio', 'titulo': 'Titulo', 'EspaciosDeTiempoEnComun': 'ET en común' };
  componentDialog = DocentesDiaogComponent;
  dataSource: ProyectosDataSource;
  filtroElegido: string = 'Aceptados'
  filtroElegido2: string = 'Pendientes'
  opciones: string[] = ['Aceptados', 'No aceptados'];
  opciones2: string[] = ['Asignados', 'Pendientes'];

  ngOnInit(): void {
    const params = this._activeRoute.snapshot.params;
    if (params) {
      this.dataSource = new ProyectosDataSource(this._proyectoService, params.id);
      this.getProyectos();      
    }
  }

  cargarTable(event: { data?: Proyecto, opcion?: any, valorOpcion?: string }) {
    if (event.opcion instanceof MatCheckboxChange)
      this.participa(event.opcion, event.data)
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getProyectos();
      })
    ).subscribe();

    this.paginator.page.pipe(
      tap(() => {
        this.getProyectos();
      })
    ).subscribe();
  }

  getProyectos() {
    this.dataSource.getProyectos(this.paginator.pageIndex + 1, this.input.nativeElement.value, this.filtroElegido, this.filtroElegido2);
  }

  participa(event: MatCheckboxChange, proyecto: Proyecto) {    
    proyecto.participa = event.checked == true ? 1 : 0;
    this._proyectoService.participa(proyecto).subscribe();
  }

  ngOnDestroy(): void {
    localStorage.removeItem('docentes');
  }
}
