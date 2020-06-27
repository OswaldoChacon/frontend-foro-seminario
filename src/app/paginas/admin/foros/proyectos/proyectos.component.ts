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
    private activeRoute: ActivatedRoute,
    private proyectoService: ProyectosService,
    private dialog: MatDialog
  ) {}

  displayedColumns = ["folio", "titulo", "participa"];
  proyectosDataSource: ProyectosDataSource;
  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    if (params) {
      this.proyectosDataSource = new ProyectosDataSource(
        this.proyectoService,
        params.id
      );
      this.proyectosDataSource.cargarProyectos("1");
    }
  }
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => {
          this.proyectosDataSource.resetData();
          this.proyectosDataSource.cargarProyectos(
            (this.paginator.pageIndex + 1).toString()
          );
        })
      )
      .subscribe();
  }
  participa(event: MatCheckboxChange, folio: number) {
    let participa = event.checked == true ? "1" : "0";
    this.proyectoService.participa(folio, participa).subscribe();
  }
  abrirDialog(proyecto: Proyectos) {
    const dialogRef = this.dialog.open(DocenteDiaogComponent, {
      data: {
        proyecto: proyecto,
        docentes: this.proyectosDataSource.getDocentes(),
      },
      // height: '70%',
      // width: '98%'
      panelClass: "my-class",
    });
  }
}
