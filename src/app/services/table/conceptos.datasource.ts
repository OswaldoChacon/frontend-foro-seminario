import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";

import { catchError, finalize, map, tap } from "rxjs/operators";
import { Concepto } from "src/app/modelos/concepto.model";
import { Plantilla } from "src/app/modelos/Plantilla.model";
import { ConceptoService } from "../conceptos/conceptos.service";
import { PlantillasService } from "../plantillas/plantillas.service";

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

  getPlantillas(pagina: number, nombre: string) {    
    this._ConceptosService.getConceptos(this.id, pagina, nombre).subscribe((conceptos) => {
      this.total = conceptos['total'];
      this.por_pagina = conceptos['per_page'];
      this.conceptoSubject.next(conceptos['data']);
      this.concepto = conceptos['data'];
    });
  }

  eliminarPlantilla(id: number) {    
    return this._ConceptosService.eliminarConcepto(id);
  }
  
}
