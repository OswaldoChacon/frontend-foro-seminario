import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PlantillasDataSource } from 'src/app/services/table/plantillas.datasource';
import { PlantillasService } from 'src/app/services/plantillas/plantillas.service';
import { MatDialog } from '@angular/material/dialog'; 
import { Plantilla } from 'src/app/modelos/plantilla.model';
import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
} from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { PlantillasDialogComponent } from "src/app/dialogs/PlantillasDialog/PlantillasDialog.component";
import { ConfirmacionDialogComponent } from "src/app/dialogs/confirmacion/confirmacion.dialog.component";
@Component({
  selector: 'app-plantillas',
  templateUrl: './plantillas.component.html',
  styleUrls: ['./plantillas.component.css']
})
export class PlantillasComponent implements OnInit {
  dataSource: PlantillasDataSource = null;
  componentDialog = PlantillasDialogComponent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("inputFiltro", { static: true }) input: ElementRef;
  constructor(
    private _PlantillasService: PlantillasService,
    private _dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.dataSource = new PlantillasDataSource(this._PlantillasService);
    
  }

  columnsHeader = {
    activo: 'Estatus',
    nombre: 'Nombre',
    created_at: 'Fecha de creacion',
    acciones: '',
  };

  cargarTable(event: { data?: Plantilla; opcion?: any; }) {
    if (event.opcion === "Eliminar")
      this.eliminarPlantilla(event.data);
    if (event.opcion === "refresh")
      this.getPlantillas();
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
