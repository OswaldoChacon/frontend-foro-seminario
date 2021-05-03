import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject } from "rxjs";
import { Grupo } from "src/app/modelos/grupo.model";
import { GrupoService } from "../grupo.service";

export class GruposDataSource extends DataSource<Grupo> {
  private Grupos: Grupo[];
  private GruposSubject = new BehaviorSubject<Grupo[]>([]);
  total: number = 0;
  por_pagina: number = 0;

  constructor(private _GruposService: GrupoService, private id: number) {
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
      localStorage.setItem('plantilla_id', res['plantilla_id']);
    });
  }

  eliminarGrupo(id: number, plantilla: string) {
    return this._GruposService.eliminarGrupo(id, plantilla);
  }

}
