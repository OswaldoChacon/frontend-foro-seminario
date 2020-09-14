import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForoService } from "src/app/services/foro/foro.service";
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
import { throwError, of } from "rxjs";
import { FechaDialogComponent } from '../../dialogs/fecha/fecha.dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BreaksSheetComponent } from '../../bottomsheets/breaks.sheet/breaks.sheet.component';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { BreaksDialogComponent } from '../../dialogs/breaks/breaks.dialog.component';


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
  
  dataSource: FechasDataSource = null;
  componentDialog = FechaDialogComponent;
  columnsHeader = { 'fecha': 'Fecha', 'hora_inicio': 'Hora de inicio', 'hora_termino': 'Hora de termino', 'acciones': '' }
  foro: Foro;
  fecha: Fecha;
  cargando = true;
  slug: string;
  docentes: Usuario[];
  constructor(
    private _foroService: ForoService,
    private _formBuilder: FormBuilder,    
    private _activeRoute: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {    
    if (this._activeRoute.snapshot.params.id) {
      this.slug = this._activeRoute.snapshot.params.id;
      this._foroService.getForo(this._activeRoute.snapshot.params.id).pipe(
        tap(foro => {
          this.formConfigForo.setValue({
            lim_alumnos: foro.lim_alumnos,
            num_aulas: foro.num_aulas,
            duracion: foro.duracion,
            num_maestros:foro.num_maestros
          })          
          this.foro = foro;
          this.docentes = foro.docentes;          
          this.dataSource = new FechasDataSource(foro.fechas, this._foroService);
        }),
        finalize(() => this.cargando = false)
      ).subscribe();
    }   
  }

  elegirMaestro(event: MatCheckboxChange, docente: Usuario){
    const agregar = event.checked ? true:false;
    this._foroService.agregarMaestroTaller(this.slug,docente,agregar).subscribe();    
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
    this._foroService.configurarForo(this.foro.slug, this.formConfigForo).subscribe();
  }

  eliminarFechaForo(fecha: Date) {    
   this.dataSource.eliminarFecha(fecha).subscribe((res) => this.dataSource.getFechas(this.slug));
  }

  mostrarET(fecha: Fecha) {
    const dialogRef = this._dialog.open(BreaksDialogComponent,{
      data:fecha,      
    });
    // const bottomSheetRef = this._bottomSheet.open(BreaksSheetComponent,{
    //   data: fecha
    // });    
  }

  // guardarBreak(event: MatCheckboxChange, intervalo: Fecha["intervalos"]) {
  //   intervalo.break = !intervalo.break;
  //   if (event.checked) {
  //     this._foroService.agregarBreak(this.fecha.fecha,intervalo).subscribe();
  //   } else {
  //     this._foroService.eliminarBreak(this.fecha.fecha, intervalo.posicion).pipe(
  //         catchError(() => {
  //           intervalo.break = !intervalo.break;
  //           return of([]);
  //         })
  //       ).subscribe();
  //   }
  // }
}
