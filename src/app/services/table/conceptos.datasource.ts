import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { Concepto } from "src/app/modelos/concepto.model";
import { ConceptoService } from "../conceptos/concepto.service";

export class ConceptosDataSource extends DataSource<Concepto> {
  private concepto: Concepto[];
  private conceptoSubject = new BehaviorSubject<Concepto[]>([]);  
  total: number = 0;
  por_pagina: number = 0;

  constructor(private _ConceptosService: ConceptoService, private id: number) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Concepto[]> {
    return this.conceptoSubject.asObservable();
  }

  disconnect() {
    this.conceptoSubject.complete();    
  }

  getConceptos(pagina: number, nombre: string) {    
    this._ConceptosService.getConceptos(this.id, pagina, nombre).subscribe((res: any) => {
      this.total = res['conceptos']['total'];
      this.por_pagina = res['conceptos']['per_page'];
      this.conceptoSubject.next(res['conceptos']['data']);
      localStorage.setItem('grupo_id',res['grupo_id']);  
    });
  }

  eliminarConcepto(id: number) {    
    return this._ConceptosService.eliminarConcepto(id);
  }
  
}
