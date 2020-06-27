import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ForosService } from "src/app/services/foros/foros.service";
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
  
  formConfigForo = this.formBuilder.group({
    lim_alumnos: new FormControl("", [Validators.required, Validators.min(1)]),
    num_aulas: new FormControl("", [Validators.required, Validators.min(2)]),
    duracion: new FormControl("", [Validators.required, Validators.min(15)]),
    num_maestros: new FormControl("", [Validators.required, Validators.min(2)]),
  });
   
  mostrarEspaciosTiempo = false;
  fechasDataSource: FechasDataSource = null;
  displayedColumns = ["fecha", "hora_inicio", "hora_termino", "acciones"];
  foro: Foros;
  fecha: Fechas;
  cargando = true;  
  constructor(
    private foroService: ForosService,
    private formBuilder: FormBuilder,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // const params = this.activeRoute.snapshot.params;    
    if (this.activeRoute.snapshot.params.id) {      
      this.foroService.getForo(this.activeRoute.snapshot.params.id).subscribe(
        (res) => {
          this.cargando = false;
          this.formConfigForo.get("lim_alumnos").setValue(res.lim_alumnos);
          this.formConfigForo.get("num_aulas").setValue(res.num_aulas);
          this.formConfigForo.get("duracion").setValue(res.duracion);
          this.formConfigForo.get("num_maestros").setValue(res.num_maestros);
          this.foro = res;
          this.fechasDataSource = new FechasDataSource(res.fechas,this.foroService);
        },
        (error) => this.route.navigate(["/Administrador/foros"])
      );
    }
  }

  submitConfigForo() {
    this.foroService
      .configurarForo(this.foro.slug, this.formConfigForo.value).subscribe();
  }
  
  eliminarFechaForo(fecha: Date) {
    this.cerrarET();
    this.fechasDataSource.resetData();
    this.foroService.eliminarFechaForo(fecha).pipe(
        catchError(()=>{
          this.fechasDataSource.handleError();
          return throwError;
        }),
        finalize(() => this.fechasDataSource.cambiarValorSpinner()))
      .subscribe((res) => this.fechasDataSource.actualizarListaFechas(fecha));
  }

  openDialog() {
    let dialog = this.dialog.open(FechaDialogComponent,{
      data:{
        slug: this.activeRoute.snapshot.params.id
      }
    });
    dialog.afterClosed().pipe(
      takeWhile(res=>res!=1),
      tap(()=>this.fechasDataSource.resetData()),
      finalize(()=>this.fechasDataSource.agregarFecha(this.activeRoute.snapshot.params.id))
    ).subscribe();
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
      this.foroService
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
      this.foroService
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
