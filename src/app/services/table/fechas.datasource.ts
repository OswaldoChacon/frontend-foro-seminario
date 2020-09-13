import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Fecha } from "src/app/modelos/fecha.model";
import { ForoService } from "../foro/foro.service";
import { finalize, catchError } from "rxjs/operators";

export class FechasDataSource extends DataSource<any> {
  private fechasSubject = new BehaviorSubject<Fecha[]>([]);
  private listaFechas: Fecha[];
  private fechasLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.fechasLoading.asObservable();
  total : number;
  constructor(fechas: Fecha[], private _foroService: ForoService) {
    super();
    this.fechasSubject.next(fechas);
    this.listaFechas = fechas;
    this.total = this.listaFechas.length;
  }
  connect(CollectionViewer: CollectionViewer) {
    return this.fechasSubject.asObservable();
  }
  disconnect() {
    this.fechasSubject.complete();
    this.fechasLoading.complete();
  }
  
  // agregarFecha(fecha: Fechas) {
  getFechas(slug: string) {
    this.resetData();
    this._foroService.getForo(slug).pipe(
        catchError(()=>{
          this.handleError();
          return throwError;
        }),
        finalize(() => this.fechasLoading.next(false)),
      )
      .subscribe((res) => {
        this.listaFechas = res.fechas;
        this.fechasSubject.next(res.fechas);        
        this.total = this.listaFechas.length;
      });
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
