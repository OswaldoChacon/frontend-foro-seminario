import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge } from "rxjs";
import { Linea } from "src/app/modelos/linea.model";
import { LineaService } from "../lineas/lineas.service";
import { finalize, catchError } from "rxjs/operators";

export class LineaDataSource extends DataSource<Linea> {
  lineaSubject: BehaviorSubject<Linea[]> = new BehaviorSubject<Linea[]>([]);
  lineas: Linea[] = [];
  lineasLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private lineaService: LineaService) {
    super();
  }

  connect(CollectionViewer: CollectionViewer): Observable<Linea[]> {
    return this.lineaSubject.asObservable();
  }

  cargarLineas() {
    this.resetData();
    this.lineasLoading.next(true);
    this.lineaService
      .cargarLineas()
      .pipe(
        catchError(() => []),
        finalize(() => this.lineasLoading.next(false))
      )
      .subscribe((res) => {
        this.lineas = res;
        this.lineaSubject.next(this.lineas);
      });
  }
  eliminarLinea() {
    // this.lineaService.eliminarLinea('a').subscribe({});
  }

  resetData() {
    this.lineaSubject.next([]);
    this.lineasLoading.next(true);
  }
  agregarLinea(linea: Linea) {
    this.lineas.push(linea);
    this.lineaSubject.next(this.lineas);
  }
  totalItems() {
    return this.lineas.length;
  }

  spinnerValueBoolean() {
    return this.lineasLoading.value;
  }

  spinnerValue() {
    return this.lineasLoading.asObservable();
  }

  disconnect() {
    // console.log("complete");
    this.lineaSubject.complete();
    this.lineasLoading.complete();
  }
}
