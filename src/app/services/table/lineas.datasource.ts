import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge } from "rxjs";
import { Linea } from "src/app/modelos/linea.model";
import { LineaService } from "../lineas/lineas.service";
import { finalize, catchError } from "rxjs/operators";

export class LineaDataSource extends DataSource<Linea> {
  private lineaSubject: BehaviorSubject<Linea[]> = new BehaviorSubject<Linea[]>([]);
  private lineas: Linea[] = [];
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  constructor(private lineaService: LineaService) {
    super();
  }
  
  connect(CollectionViewer: CollectionViewer): Observable<Linea[]> {
    return this.lineaSubject.asObservable();
  }
  
  disconnect() { 
    this.lineaSubject.complete();
    this.loadingSubject.complete();
  }

  getLineas() {
    this.lineaService.cargarLineas().pipe(
        catchError(() => []),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((res) => {
        this.lineas = res;
        this.lineaSubject.next(this.lineas);
      });
  }
  
  handleError(){
    this.lineaSubject.next(this.lineas);
    this.loadingSubject.next(false);
  }
  resetData() {
    this.lineaSubject.next([]);
    this.loadingSubject.next(true);
  }

  agregarLinea(linea: Linea) {
    this.lineas.push(linea);
    this.lineaSubject.next(this.lineas);
  }

  totalItems() {
    return this.lineas.length;
  }

}
