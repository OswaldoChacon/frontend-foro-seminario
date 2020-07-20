import { Component, OnInit, ViewChild, Optional, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProyectosDataSource } from "src/app/services/table/proyectos.datasource";
import { MatPaginator } from "@angular/material/paginator";
import { tap } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DocenteDiaogComponent } from "src/app/dialogs/docentes/docentes.dialog.component";
import { Proyectos } from "src/app/modelos/proyectos.model";

@Component({
  selector: "app-proyectos",
  templateUrl: "./proyectos.component.html",
  styleUrls: ["./proyectos.component.css"],
})
export class ProyectosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _proyectoService: ProyectosService,
    private _dialog: MatDialog
  ) {}

  displayedColumns = ["folio", "titulo", "participa"];
  columnsHeader = { 'participa':'Part.','folio':'Folio','titulo':'Titulo'};
  componentDialog = DocenteDiaogComponent;
  dataSource: ProyectosDataSource;
  ngOnInit(): void {
    const params = this._activeRoute.snapshot.params;
    if (params) {
      this.dataSource = new ProyectosDataSource(
        this._proyectoService,
        params.id
      );
      this.dataSource.cargarProyectos("1");
    }
  }
  cargarTable(event: { data?: Proyectos, opcion?: any, valorOpcion?: string }) {

  }
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          this.dataSource.resetData();
          this.dataSource.cargarProyectos(
            (this.paginator.pageIndex + 1).toString()
          );
        })
      )
      .subscribe();
  }
  participa(event: MatCheckboxChange, folio: number) {
    let participa = event.checked == true ? "1" : "0";
    this._proyectoService.participa(folio, participa).subscribe();
  }
  abrirDialog(proyecto: Proyectos) {
    const dialogRef = this._dialog.open(DocenteDiaogComponent, {
      data: {
        proyecto: proyecto,
        docentes: this.dataSource.getDocentes(),
      },
      // height: '70%',
      // width: '98%'
      panelClass: "my-class",
    });
  }
}
