import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, throwError } from "rxjs";

import { catchError, finalize, map, tap } from "rxjs/operators";
import { Plantilla } from "src/app/modelos/Plantilla.model";
import { PlantillaService } from "../plantilla.service";

export class PlantillasDataSource extends DataSource<Plantilla> {
  private plantillas: Plantilla[];
  private plantillasSubject = new BehaviorSubject<Plantilla[]>([]);  
  total: number = 0;
  por_pagina: number = 0;

  constructor(private plantillasService: PlantillaService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Plantilla[]> {
    return this.plantillasSubject.asObservable();
  }

  disconnect() {
    this.plantillasSubject.complete();    
  }

  getPlantillas(pagina: number, nombre: string) {    
    this.plantillasService.getPlantillas(pagina, nombre).subscribe((plantillas) => {
      this.total = plantillas['total'];
      this.por_pagina = plantillas['per_page'];
      this.plantillasSubject.next(plantillas['data']);
      this.plantillas = plantillas['data'];
    });
  }

  eliminarPlantilla(id: number) {    
    return this.plantillasService.eliminarPlantilla(id);
  }
  
}
