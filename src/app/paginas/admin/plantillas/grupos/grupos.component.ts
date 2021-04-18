import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute } from '@angular/router';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { MatDialog } from '@angular/material/dialog'; 
import { GruposDataSource } from 'src/app/services/table/grupo.datasource';
import { Grupo } from 'src/app/modelos/grupo.model';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import { GrupoDialogComponent } from 'src/app/dialogs/grupo/grupoDialog.component';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  dataSource: GruposDataSource = null;
  componentDialog = GrupoDialogComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('inputFiltro', { static: true }) input: ElementRef
  constructor(
    private _activeRoute: ActivatedRoute,
    private _GruposService: GruposService,
    private _dialog: MatDialog
  ) { }


  ngOnInit() {
    const params = this._activeRoute.snapshot.params;
    // if (params) {
      this.dataSource = new GruposDataSource(this._GruposService, params.id);
    //   this.getGrupos();      
    // }
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, "keyup").pipe(debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getGrupos();
      })
    ).subscribe();

    this.paginator.page.pipe(tap(() => {
      this.getGrupos();
    })
    ).subscribe();
    this.getGrupos();
  }
  
  columnsHeader = {
    activo: 'Estatus',
    nombre: 'Nombre',
    ponderacion: 'Ponderacion',
    created_at: 'Fecha de creacion',
    acciones: '',
  };

  cargarTable(event: { data?: Grupo; opcion?: any; }) {
    if (event.opcion === "Eliminar")
      this.eliminarGrupo(event.data);
    if (event.opcion === "refresh")
      this.getGrupos();
  }

  getGrupos() {
    this.dataSource.getGrupos(
      this.paginator.pageIndex + 1,
      this.input.nativeElement.value
    );
  }

  eliminarGrupo(Grupo: Grupo) {    
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarGrupo(Grupo.id).subscribe(() => this.getGrupos());
    })

  }

  ngOnDestroy(): void {
    localStorage.removeItem('plantilla_id');
  }
}
