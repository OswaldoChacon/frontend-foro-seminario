import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge } from "rxjs";
import { Linea } from "src/app/modelos/linea.model";
import { LineaService } from "../linea/linea.service";
import { finalize, catchError } from "rxjs/operators";

export class LineaDataSource extends DataSource<Linea> {
  private lineaSubject: BehaviorSubject<Linea[]> = new BehaviorSubject<Linea[]>([]);
  private lineas: Linea[] = [];
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  total: number = 0;
  constructor(private _lineaService: LineaService) {
    super();
  }

  connect(CollectionViewer: CollectionViewer): Observable<Linea[]> {
    return this.lineaSubject.asObservable();
  }

  disconnect() {
    this.lineaSubject.complete();
    this.loadingSubject.complete();
  }

  getLineas(url:string) {
    this.resetData();
    this._lineaService.getLineas(url).pipe(
      catchError(() => []),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((res) => {
      this.lineas = res;
      this.lineaSubject.next(this.lineas);
      this.total =  this.lineas?.length;
    });
  }

  handleError() {
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
