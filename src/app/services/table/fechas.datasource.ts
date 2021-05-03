import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Fecha } from "src/app/modelos/fecha.model";
import { ForoService } from "../foro.service";
import { finalize, catchError } from "rxjs/operators";

export class FechasDataSource extends DataSource<any> {
  private fechasSubject = new BehaviorSubject<Fecha[]>([]);
  private fechas: Fecha[];
  total: number;

  constructor(fechas: Fecha[], private _foroService: ForoService) {
    super();
    this.fechasSubject.next(fechas);
    this.fechas = fechas;
    this.total = this.fechas.length;
  }
  
  connect(CollectionViewer: CollectionViewer) {
    return this.fechasSubject.asObservable();
  }

  disconnect() {
    this.fechasSubject.complete();
  }

  getFechas(slug: string) {    
    this._foroService.getForo(slug).subscribe((res) => {
      this.fechas = res.fechas;
      this.fechasSubject.next(res.fechas);
      this.total = this.fechas.length;
    });
  }

  eliminarFecha(fecha: Date) {
    return this._foroService.eliminarFechaForo(fecha);
  }
}
