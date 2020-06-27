import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { HorarioJuradoService } from "../horario/horario-jurado.service";
import { BehaviorSubject } from "rxjs";
import { Usuario } from "src/app/modelos/usuario.model";
import { finalize } from 'rxjs/operators';

export class JuradoDataSource extends DataSource<Usuario> {
  juradoSubject = new BehaviorSubject<Usuario[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(true);
  total: number;
  por_pagina: number;
  constructor(private juradoService: HorarioJuradoService) {
    super();
  }
  connect(collectionViewer: CollectionViewer) {
    return this.juradoSubject.asObservable();
  }
  disconnect() {
    this.juradoSubject.complete();
  }
  cargarJurado(pagina: string) {
    this.juradoService.getJuraro(pagina).pipe(
        finalize(()=>this.loadingSubject.next(false))
    ).subscribe((res) => {
      this.juradoSubject.next(res["jurado"]["data"]);
      this.total = res["jurado"]["total"];
      this.por_pagina = res["jurado"]["per_page"];
    });
  }
  totalItems(): number {
    return this.total;
  }
  spinnerValue() {
    return this.loadingSubject;
  }
  ItemsPorPagina(): number {
    return this.por_pagina;
  }
  resetData(){
      this.loadingSubject.next(true);
      this.juradoSubject.next([]);
  }
}
