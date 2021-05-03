import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForoService } from "src/app/services/foro.service";
import {
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Foro } from "src/app/modelos/foro.model";
import { FechasDataSource } from "src/app/services/table/fechas.datasource";
import { Fecha } from "src/app/modelos/fecha.model";
import { finalize, catchError, tap, takeWhile } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { FechaDialogComponent } from '../../dialogs/fecha/fecha.dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BreaksSheetComponent } from '../../bottomsheets/breaks.sheet/breaks.sheet.component';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { BreaksDialogComponent } from '../../dialogs/breaks/breaks.dialog.component';
import { ConfirmacionDialogComponent } from 'src/app/dialogs/confirmacion/confirmacion.dialog.component';


@Component({
  selector: "app-configurar-foro",
  templateUrl: "./configurar-foro.component.html",
  styleUrls: ["./configurar-foro.component.css"],
})

export class ConfigurarForoComponent implements OnInit {

  formConfigForo = this.formBuilder.group({
    lim_alumnos: new FormControl("", [Validators.required, Validators.min(1)]),
    num_aulas: new FormControl("", [Validators.required, Validators.min(1)]),
    duracion: new FormControl("", [Validators.required, Validators.min(15)]),
    num_maestros: new FormControl("", [Validators.required, Validators.min(2)]),
  });

  dataSource: FechasDataSource = null;
  componentDialog = FechaDialogComponent;
  columnsHeader = { 'fecha': 'Fecha', 'hora_inicio': 'Hora de inicio', 'hora_termino': 'Hora de termino', 'acciones': '' }
  columnsHeaderPlantilla = {
    activo: 'Activo',
    nombre: 'Nombre'
  }
  foro: Foro;
  fecha: Fecha;
  cargando = true;
  slug: string;
  docentes: Usuario[] = [];
  constructor(
    private foroService: ForoService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.slug = this.activeRoute.snapshot.params.id;      
      this.foroService.getForo(this.slug).pipe(
        tap(foro => {
          this.formConfigForo.patchValue(foro)
          this.foro = foro;
          this.docentes = foro.docentes;
          this.dataSource = new FechasDataSource(foro.fechas, this.foroService);
        }),
        finalize(() => this.cargando = false)
      ).subscribe();
    }
  }

  elegirMaestro(event: MatCheckboxChange, docente: Usuario) {
    const agregar = event.checked ? true : false;
    this.foroService.agregarMaestroTaller(this.slug, docente, agregar).subscribe();
  }

  cargarTable(event: { data?: Fecha, opcion?: any, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getFechas(this.slug);
    if (event.opcion === 'Eliminar')
      this.eliminarFechaForo(event.data.fecha);
    if (event.opcion === 'Break')
      this.mostrarET(event.data);
  }

  configurarForo() {
    this.foroService.configurarForo(this.slug, this.formConfigForo).subscribe();
  }

  eliminarFechaForo(fecha: Date) {
    this.dialog.open(ConfirmacionDialogComponent, {
      data: '¿Estas seguro de realizar esta acción? Todos los horarios de los maestros serán eliminados'
    }).afterClosed().subscribe((res: boolean) => {
      if (res)
        this.dataSource.eliminarFecha(fecha).subscribe((res) => this.dataSource.getFechas(this.slug));
    });
  }

  mostrarET(fecha: Fecha) {
    const dialogRef = this.dialog.open(BreaksDialogComponent, {
      data: fecha,
    });
  }

}
