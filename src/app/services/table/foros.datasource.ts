import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, of } from "rxjs";
import { Foros } from "src/app/modelos/foro.model";
import { ForoService } from "../foro/foro.service";
import { finalize, catchError } from "rxjs/operators";

export class ForosDataSource extends DataSource<Foros> {
  private forosSubject = new BehaviorSubject<Foros[]>([]);
  private forosLoading = new BehaviorSubject<boolean>(true);
  loading$ = this.forosLoading.asObservable();
  total: number = 0;
  por_pagina: number = 0;
  private foros: Foros[] = [];
  constructor(private _foroService: ForoService) {
    super();
  }
  getForos(pagina:number,no_foro:number) {
    this.resetData();
    this._foroService.getForos(pagina,no_foro).pipe(
        // catchError((error) => {
        //   this.cargarForosLocal();
        //   return of(`Error load foros ${error}`)
        // }),
        finalize(() => this.forosLoading.next(false))
      )
      .subscribe((foros: Foros[]) => {
        this.total = foros["total"];
        this.por_pagina = foros["per_page"];
        this.forosSubject.next(foros["data"]);
        this.foros = foros["data"];
      });
  }
  connect(CollectionViewer: CollectionViewer) {
    return this.forosSubject.asObservable();
  }
  resetData() {
    this.forosSubject.next([]);
    this.forosLoading.next(true);
  }
  disconnect() {
    this.forosSubject.complete();
    this.forosLoading.complete();
  }
  spinnerValue() {
    return this.forosLoading;
  }
  spinnerValueBoolean() {
    return this.forosLoading.value;
  }
  getTotalFiltrados() {
    return this.forosSubject?.value?.length;
  }
  totalItems(): number {
    return this.total;
  }
  ItemsPorPagina(): number {
    return this.por_pagina;
  }

  cargarForosLocal(){
    this.forosSubject.next(this.foros);
    this.forosLoading.next(false);
  }
}
