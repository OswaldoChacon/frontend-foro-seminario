import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Fechas } from "src/app/modelos/fechas.model";
import { ForoService } from "../foro/foro.service";
import { finalize, catchError } from "rxjs/operators";

export class FechasDataSource extends DataSource<any> {
  private fechasSubject = new BehaviorSubject<Fechas[]>([]);
  private listaFechas: Fechas[];
  private fechasLoading = new BehaviorSubject<boolean>(false);
  constructor(fechas: Fechas[], private _foroService: ForoService) {
    super();
    this.fechasSubject.next(fechas);
    this.listaFechas = fechas;
  }
  connect(CollectionViewer: CollectionViewer) {
    return this.fechasSubject.asObservable();
  }
  disconnect() {
    this.fechasSubject.complete();
    this.fechasLoading.complete();
  }
  // agregarFecha(fecha: Fechas) {
  agregarFecha(slug: string) {
    this.fechasLoading.next(true);
    this._foroService
      .getForo(slug)
      .pipe(
        catchError(()=>{
          this.handleError();
          return throwError;
        }),
        finalize(() => this.fechasLoading.next(false)),
      )
      .subscribe((res) => {
        this.listaFechas = res.fechas;
        this.fechasSubject.next(res.fechas);
      });
  }

  actualizarListaFechas(fecha: Date) {
    this.listaFechas = this.listaFechas.filter(
      (fechaItem) => fechaItem.fecha !== fecha
    );
    this.fechasSubject.next(this.listaFechas);
  }
  resetData() {
    this.fechasLoading.next(true);
    this.fechasSubject.next([]);
  }
  handleError(){
    this.fechasSubject.next(this.listaFechas);
    this.fechasLoading.next(false);
  }
  
  getTotalFechas() {
    return this.fechasSubject?.value?.length;
  }
}
