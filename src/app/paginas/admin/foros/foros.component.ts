import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatTabGroup } from "@angular/material/tabs";
import { MatTableDataSource } from "@angular/material/table";
import { ForosDataSource } from "src/app/services/table/foros.datasource";
import { ForoService } from "src/app/services/foro/foro.service";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ForoDialogComponent } from "src/app/dialogs/foro/foro.dialog.component";
import { Foros } from "src/app/modelos/foro.model";
import { finalize, tap, takeWhile, first, catchError, map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { of, throwError, fromEvent } from 'rxjs';

@Component({
  selector: "app-foros",
  templateUrl: "./foros.component.html",
  styleUrls: ["./foros.component.css"],
})
export class ForosComponent implements OnInit {
  columnsHeader = {'activo':'Activo', 'no_foro': 'No. Foro', 'periodo': 'Periodo', 'anio': 'Año', 'acciones': '' };
  // 'nombre': 'Nombre',
  componentDialog = ForoDialogComponent;
  // dataSource = ELEMENT_DATA;
  dataSource: ForosDataSource = null;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro',{static:true}) input: ElementRef;
  constructor(private _foroService: ForoService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new ForosDataSource(this._foroService);
    this.getForos();
    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(()=>{
        this.paginator.pageIndex = 0;        
        this.getForos()
      })
    ).subscribe()

    this.paginator.page.pipe(
      tap(()=>this.getForos())
    ).subscribe()
  }
 

  getForos() {
    this.dataSource.getForos(this.paginator.pageIndex + 1,this.input.nativeElement.value);
  }


  cargarTable(event: { data?: Foros, opcion?: string, valorOpcion?: any }) {
    if (event.opcion === 'Eliminar')
      this.eliminarForo(event.data)
    if (event.opcion === 'refresh')
      this.getForos();
    if(event.opcion === 'Activar/Desactivar'){
      this.dataSource.resetData();
      this._foroService.activar_desactivar(event.data.slug,event.valorOpcion).subscribe(()=>this.getForos())
    }
    console.log(event);
  }

  // nextPage(event: any) {
  //   console.log(event);
  //   this.dataSource.resetData();
  //   // this.dataSource.getForos(event.pageIndex + 1);
  //   return event;
  // }


  eliminarForo(foro: Foros) {
    this.dataSource.resetData()
    this._foroService.eliminarForo(foro.slug).pipe(
      catchError((error) => {
        this.dataSource.cargarForosLocal();
        return throwError(error)
      })
    ).subscribe(res =>this.getForos());
  }
}
