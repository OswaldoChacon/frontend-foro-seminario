import { DataSource } from "@angular/cdk/table";
import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, of, throwError } from "rxjs";
import { Foro } from "src/app/modelos/foro.model";
import { ForoService } from "../foro/foro.service";
import { finalize, catchError } from "rxjs/operators";

export class ForosDataSource extends DataSource<Foro> {
  private forosSubject = new BehaviorSubject<Foro[]>([]);
  total: number = 0;
  por_pagina: number = 0;
  private foros: Foro[] = [];
  constructor(private _foroService: ForoService) {
    super();
  }
  getForos(pagina: number, no_foro: number) {
    this.resetData();
    this._foroService.getForos(pagina, no_foro).subscribe((foros: Foro[]) => {
      this.total = foros["total"];
      this.por_pagina = foros["per_page"];
      this.forosSubject.next(foros["data"]);
      this.foros = foros["data"];
    });
  }

  eliminarForo(slug: string) {
    this.resetData();
    return this._foroService.eliminarForo(slug);
  }

  connect(CollectionViewer: CollectionViewer) {
    return this.forosSubject.asObservable();
  }

  resetData() {
    this.forosSubject.next([]);
  }

  disconnect() {
    this.forosSubject.complete();
  }

}
