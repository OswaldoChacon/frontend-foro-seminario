import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PlantillasDataSource } from 'src/app/services/table/plantillas.datasource';
import { PlantillaService } from 'src/app/services/plantilla.service';
import { MatDialog } from '@angular/material/dialog';
import { Plantilla } from 'src/app/modelos/plantilla.model';
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { PlantillasDialogComponent } from "src/app/dialogs/plantilla/plantilla-dialog.component";
import { ConfirmacionDialogComponent } from "src/app/dialogs/confirmacion/confirmacion.dialog.component";
@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {
  dataSource: PlantillasDataSource = null;
  componentDialog = PlantillasDialogComponent;
  columnsHeader = {
    activo: 'Activo',
    acceso: 'Estatus',
    nombre: 'Nombre',
    created_at: 'Fecha de creacion',
    acciones: '',
  };

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("inputFiltro", { static: true }) input: ElementRef;
  constructor(
    private PlantillasService: PlantillaService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource = new PlantillasDataSource(this.PlantillasService);

  }

  cargarTable(event: { data?: Plantilla, opcion?: any, valorOpcion?: any }) {
    if (event.opcion === "Eliminar")
      this.eliminarPlantilla(event.data);
    else if (event.opcion === "refresh")
      this.getPlantillas();
    else if (event.opcion === 'Activar/Desactivar') {
      this._dialog.open(ConfirmacionDialogComponent, {
        data: '¿Estas seguro de desactivar el foro? Esto podría eliminar los horarios establecido de los maestros?'
      }).afterClosed().subscribe((res: boolean) => {
        if (res)
          this.PlantillasService.activarPlantilla(event.data, event.valorOpcion).subscribe();
        else
          event.data.activo = true;
      })
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, "keyup").pipe(debounceTime(400),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.getPlantillas();
      })
    ).subscribe();

    this.paginator.page.pipe(tap(() => {
      this.getPlantillas();
    })
    ).subscribe();
    this.getPlantillas();
  }


  getPlantillas() {
    this.dataSource.getPlantillas(
      this.paginator.pageIndex + 1,
      this.input.nativeElement.value
    );
  }

  eliminarPlantilla(plantilla: Plantilla) {
    this._dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción?'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarPlantilla(plantilla.id).subscribe(() => this.getPlantillas());
    });
  }
}
