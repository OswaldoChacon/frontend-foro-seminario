import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ForosDataSource } from "src/app/services/table/foros.datasource";
import { ForoService } from "src/app/services/foro/foro.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ForoDialogComponent } from "../dialogs/foro/foro.dialog.component";
import { Foro } from "src/app/modelos/foro.model";
import { tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';

@Component({
  selector: "app-foros",
  templateUrl: "./foros.component.html",
  styleUrls: ["./foros.component.css"],
})
export class ForosComponent implements OnInit {
  columnsHeader = { 'activo': 'Activo', 'no_foro': 'No. Foro', 'periodo': 'Periodo', 'anio': 'Año', 'fecha_limite': 'Fecha limite de registro', 'acciones': '' };
  componentDialog = ForoDialogComponent;
  dataSource: ForosDataSource = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro', { static: true }) input: ElementRef;
  constructor(private _foroService: ForoService, 
    private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new ForosDataSource(this._foroService);
    this.getForos();
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getForos()
      })
    ).subscribe()

    this.paginator.page.pipe(
      tap(() => this.getForos())
    ).subscribe()
  }


  getForos() {
    this.dataSource.getForos(this.paginator.pageIndex + 1, this.input.nativeElement.value);
  }

  cargarTable(event: { data?: Foro, opcion?: string, valorOpcion?: any }) {
    if (event.opcion === 'Eliminar')
      this.eliminarForo(event.data)
    if (event.opcion === 'refresh')
      this.getForos();
    if (event.opcion === 'Activar/Desactivar') {
      this._dialog.open(ConfirmacionDialogComponent,{
        data: '¿Estas seguro de desactivar el foro? Esto podría eliminar los horarios establecido de los maestros?'
      }).afterClosed().subscribe((res:boolean)=>{
        if(res)
          this._foroService.activar_desactivar(event.data, event.valorOpcion).subscribe();
        else
        event.data.activo = true;
      })            
    }
  }

  eliminarForo(foro: Foro) {
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarForo(foro.slug).subscribe(res => this.getForos());
    });    
  }
}
