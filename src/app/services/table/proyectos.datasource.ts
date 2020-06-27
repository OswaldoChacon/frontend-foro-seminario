import { DataSource } from "@angular/cdk/table";
import { Proyectos } from "src/app/modelos/proyectos.model";
import { BehaviorSubject } from "rxjs";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize, catchError } from 'rxjs/operators';
import { ProyectosService } from '../proyectos/proyectos.service';

export class ProyectosDataSource extends DataSource<Proyectos> {
  total: number;
  por_pagina: number;
  proyectos: any;  
  private docentes: any;
  constructor(private proyectoService: ProyectosService, private slug: string) {
    super();
  }

  proyectosSubject: BehaviorSubject<Proyectos[]> = new BehaviorSubject<
    Proyectos[]
  >([]);
  proyectosLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  connect(collectionViewer: CollectionViewer) {
    return this.proyectosSubject.asObservable();
  }
  disconnect() {}
  cargarProyectos(pagina:string) {
    this.resetData();
    this.proyectoService.getProyectos(this.slug,pagina).pipe(
      finalize(()=>this.proyectosLoading.next(false)),
      catchError(()=>([]))
    ).subscribe((res: any) => {
      this.proyectosSubject.next(res['proyectos']['data']);
      this.total = res['proyectos']['total'];
      this.por_pagina = res['proyectos']['per_page'];
      this.proyectos = res['proyectos']['data'];      
      this.docentes = res['docentes'];
    });  
    
  }
  totalItems(): number {
    return this.total;
  }

  ItemsPorPagina(): number {
    return this.por_pagina;
  }
  resetData() {
    this.proyectosSubject.next([]);
    this.proyectosLoading.next(true);
  }
  spinnerValue(){
    return this.proyectosLoading;
  } 
  getDocentes(){
    return this.docentes;
  }
}
