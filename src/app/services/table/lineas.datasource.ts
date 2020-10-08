import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of, merge, throwError } from "rxjs";
import { Linea } from "src/app/modelos/linea.model";
import { LineaService } from "../linea/linea.service";
import { finalize, catchError } from "rxjs/operators";

export class LineaDataSource extends DataSource<Linea> {
  private lineaSubject: BehaviorSubject<Linea[]> = new BehaviorSubject<Linea[]>([]);
  private lineas: Linea[] = [];
  total: number = 0;

  constructor(private _lineaService: LineaService) {
    super();
  }

  connect(CollectionViewer: CollectionViewer): Observable<Linea[]> {
    return this.lineaSubject.asObservable();
  }

  disconnect() {
    this.lineaSubject.complete();
  }

  getLineas(url: string) {
    this._lineaService.getLineas(url).subscribe((res) => {
      this.lineas = res;
      this.lineaSubject.next(this.lineas);
      this.total = this.lineas?.length;
    });
  }

  eliminarLinea(linea: Linea, url: string) {
    return this._lineaService.eliminarLinea(linea.clave, url);
  }

  agregarLinea(linea: Linea) {
    this.lineas.push(linea);
    this.lineaSubject.next(this.lineas);
  }

  totalItems() {
    return this.lineas.length;
  }

}
