import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject } from "rxjs";
import { Grupo } from "src/app/modelos/grupo.model";
import { GruposService } from "../grupos/grupos.service";

export class GruposDataSource extends DataSource<Grupo> {
  private Grupos: Grupo[];
  private GruposSubject = new BehaviorSubject<Grupo[]>([]);  
  // private GruposSubject: BehaviorSubject<Grupo[]> = new BehaviorSubject<Grupo[]>([]);
  total: number = 0;
  por_pagina: number = 0;

  constructor(private _GruposService: GruposService, private id: number) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Grupo[]> {
    return this.GruposSubject.asObservable();
  }

  disconnect() {
    this.GruposSubject.complete();    
  }

  getGrupos(pagina: number, nombre: string) {    
    this._GruposService.getGrupos(this.id, pagina, nombre).subscribe((res: any) => {
      this.total = res['grupos']['total'];
      this.por_pagina = res['grupos']['per_page'];
      this.GruposSubject.next(res['grupos']['data']);
      this.GruposSubject =  res['grupos']['data'];
      localStorage.setItem('plantilla_id',res['plantilla_id']);  
    });
  }

  eliminarGrupo(id: number) {    
    return this._GruposService.eliminarGrupo(id);
  }
  
}