import { DataSource } from "@angular/cdk/table";
import { Proyecto } from "src/app/modelos/proyecto.model";
import { BehaviorSubject } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize, catchError } from 'rxjs/operators';
import { ProyectosService } from '../proyectos/proyectos.service';

export class ProyectosDataSource extends DataSource<Proyecto> {
  private proyectosSubject: BehaviorSubject<Proyecto[]> = new BehaviorSubject<Proyecto[]>([]);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();
  total: number;
  por_pagina: number;
  private proyectos: Proyecto[];
  private docentes: any;
  constructor(private proyectoService: ProyectosService, private slug: string) {
    super();
  }

  

  connect(collectionViewer: CollectionViewer) {
    return this.proyectosSubject.asObservable();
  }
  disconnect() { 
    this.proyectosSubject.complete();
    this.loadingSubject.complete();
  }

  getProyectos(pagina: number,folio:string,filtro:string) {
    this.resetData();
    this.proyectoService.getProyectos(this.slug, pagina,folio,filtro).pipe(
      finalize(() => this.loadingSubject.next(false)),
      catchError(() => ([]))
    ).subscribe((res: any) => {
      this.proyectosSubject.next(res['proyectos']['data']);
      this.total = res['proyectos']['total'];
      this.por_pagina = res['proyectos']['per_page'];
      this.proyectos = res['proyectos']['data'];
      localStorage.setItem('docentes',JSON.stringify(res['docentes']));
      this.docentes = res['docentes'];
    });

  }
 
  resetData() {
    this.proyectosSubject.next([]);
    this.loadingSubject.next(true);
  }
 
  getDocentes() {
    return this.docentes;
  }
}
