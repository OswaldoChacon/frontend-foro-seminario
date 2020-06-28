import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { MatTableDataSource } from "@angular/material/table";
import { ForosDataSource } from "src/app/services/table/foros.datasource";
import { ForosService } from "src/app/services/foros/foros.service";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ForosDialogComponent } from "src/app/dialogs/foros/foros.dialog.component";
import { Foros } from "src/app/modelos/foro.model";
import { finalize, tap, takeWhile, first, catchError, map } from "rxjs/operators";
import { of, throwError } from 'rxjs';

@Component({
  selector: "app-foros",
  templateUrl: "./foros.component.html",
  styleUrls: ["./foros.component.css"],
})
export class ForosComponent implements OnInit {
  // columnas = ["position","name","weight","symbol","acciones"];
  columnas = ["no_foro", "nombre", "periodo", "anio", "acciones"];
  // dataSource = ELEMENT_DATA;
  dataSource: ForosDataSource = null;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private foroService: ForosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new ForosDataSource(this.foroService);
    this.dataSource.cargarForos(1);
  }
  abrirDialog() {
    let dialogRef = this.dialog.open(ForosDialogComponent);
    dialogRef.afterClosed().pipe(
      takeWhile(res=>res!=1),
      tap(()=>this.dataSource.resetData()),
      finalize(()=>this.dataSource.cargarForos(this.paginator.pageIndex + 1))
    )
    .subscribe();
  }
  configurarForo(id: number) {
    // this.route.navigate([])
    // console.log("configurarofoo");
  }
  nextPage(event: any) {
    console.log(event);
    this.dataSource.resetData();
    this.dataSource.cargarForos(event.pageIndex + 1);
    return event;
  }
  
  editarForo(foro: Foros) {
    let dialogRef = this.dialog.open(ForosDialogComponent, { data: foro });
    dialogRef
      .afterClosed()
      .pipe(
        takeWhile(res => res != 1),
        tap(() => this.dataSource.resetData()),        
      )
      .subscribe(() => {        
          this.dataSource.cargarForos(this.paginator.pageIndex + 1);
      });
  }
  eliminarForo(slug: string) {    
    this.dataSource.resetData()
    this.foroService.eliminarForo(slug).pipe(        
        catchError((error)=>{
          this.dataSource.cargarForosLocal();
          return throwError(error)
        })
      )
      .subscribe(res =>
        this.dataSource.cargarForos(this.paginator.pageIndex + 1)
      );
  }
}
