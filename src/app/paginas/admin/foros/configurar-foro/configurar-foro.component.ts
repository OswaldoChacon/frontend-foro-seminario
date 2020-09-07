import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForoService } from "src/app/services/foro/foro.service";
import {
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Foros } from "src/app/modelos/foro.model";
import { FechasDataSource } from "src/app/services/table/fechas.datasource";
import { Fechas } from "src/app/modelos/fechas.model";
import { MatDialog } from "@angular/material/dialog";
import { finalize, catchError, tap, takeWhile } from "rxjs/operators";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { throwError, of } from "rxjs";
import { FechaDialogComponent } from 'src/app/dialogs/fecha/fecha.dialog.component';

@Component({
  selector: "app-configurar-foro",
  templateUrl: "./configurar-foro.component.html",
  styleUrls: ["./configurar-foro.component.css"],
})

export class ConfigurarForoComponent implements OnInit {

  formConfigForo = this._formBuilder.group({
    lim_alumnos: new FormControl("", [Validators.required, Validators.min(1)]),
    num_aulas: new FormControl("", [Validators.required, Validators.min(2)]),
    duracion: new FormControl("", [Validators.required, Validators.min(15)]),
    num_maestros: new FormControl("", [Validators.required, Validators.min(2)]),
  });

  mostrarEspaciosTiempo = false;
  dataSource: FechasDataSource = null;
  componentDialog = FechaDialogComponent;
  columnsHeader = { 'fecha': 'Fecha', 'hora_inicio': 'Hora de inicio', 'hora_termino': 'Hora de termino', 'acciones': '' }
  displayedColumns = ["fecha", "hora_inicio", "hora_termino", "acciones"];
  foro: Foros;
  fecha: Fechas;
  cargando = true;
  slug: string;
  constructor(
    private _foroService: ForoService,
    private _formBuilder: FormBuilder,
    private _route: Router,
    private _activeRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this._activeRoute.snapshot.params.id) {
      this.slug = this._activeRoute.snapshot.params.id;
      this._foroService.getForo(this._activeRoute.snapshot.params.id).subscribe(
        (res) => {
          this.cargando = false;
          this.formConfigForo.get("lim_alumnos").setValue(res.lim_alumnos);
          this.formConfigForo.get("num_aulas").setValue(res.num_aulas);
          this.formConfigForo.get("duracion").setValue(res.duracion);
          this.formConfigForo.get("num_maestros").setValue(res.num_maestros);
          this.foro = res;
          this.dataSource = new FechasDataSource(res.fechas, this._foroService);
        },
        (error) => this._route.navigate(["/Administrador/foros"])
      );
    }
  }

  cargarTable(event: { data?: Fechas, opcion?: any, valorOpcion?: string }) {
    if (event.opcion === 'refresh')
      this.dataSource.getFechas(this.slug);
    if (event.opcion === 'Eliminar')
      this.eliminarFechaForo(event.data.fecha);
    if (event.opcion === 'Break')
      this.mostrarET(event.data);
  }

  configurarForo() {
    this._foroService.configurarForo(this.foro.slug, this.formConfigForo.value).subscribe();
  }

  eliminarFechaForo(fecha: Date) {
    this.cerrarET();
    this.dataSource.resetData();
    this._foroService.eliminarFechaForo(fecha).pipe(
      catchError(() => {
        this.dataSource.handleError();
        return throwError;
      })
    ).subscribe((res) => this.dataSource.getFechas(this.slug));
  }



  mostrarET(fecha: Fechas) {
    this.fecha = fecha;
    this.mostrarEspaciosTiempo = true;
  }

  cerrarET() {
    this.fecha = null;
    this.mostrarEspaciosTiempo = false;
  }

  guardarBreak(event: MatCheckboxChange, intervalo: Fechas["intervalos"]) {
    intervalo.break = !intervalo.break;
    if (event.checked) {
      this._foroService
        .agregarBreak(this.fecha.fecha, {
          hora: intervalo.hora,
          posicion: intervalo.posicion,
        })
        .pipe(
          catchError(() => {
            intervalo.break = !intervalo.break;
            return of([]);
          })
        )
        .subscribe();
    } else {
      this._foroService
        .eliminarBreak(this.fecha.fecha, intervalo.posicion)
        .pipe(
          catchError(() => {
            intervalo.break = !intervalo.break;
            return of([]);
          })
        )
        .subscribe();
    }
  }
}
