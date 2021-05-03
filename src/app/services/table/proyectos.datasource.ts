import { DataSource } from "@angular/cdk/table";
import { Proyecto } from "src/app/modelos/proyecto.model";
import { BehaviorSubject } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize, catchError } from 'rxjs/operators';
import { ProyectoService } from '../proyecto.service';

export class ProyectosDataSource extends DataSource<Proyecto> {
  private proyectosSubject: BehaviorSubject<Proyecto[]> = new BehaviorSubject<Proyecto[]>([]);
  
  total: number;
  por_pagina: number;
  private proyectos: Proyecto[];

  constructor(private proyectoService: ProyectoService, private slug: string) {
    super();
  }
 
  connect(collectionViewer: CollectionViewer) {
    return this.proyectosSubject.asObservable();
  }

  disconnect() { 
    this.proyectosSubject.complete();    
  }

  getProyectos(pagina: number,folio:string,filtro:string, jurado:string) {    
    this.proyectoService.getProyectos(this.slug, pagina,folio,filtro,jurado).subscribe((res: any) => {
      this.proyectosSubject.next(res['proyectos']['data']);
      this.total = res['proyectos']['total'];
      this.por_pagina = res['proyectos']['per_page'];
      this.proyectos = res['proyectos']['data'];
      localStorage.setItem('docentes',JSON.stringify(res['docentes']));      
    });

  }    
}
