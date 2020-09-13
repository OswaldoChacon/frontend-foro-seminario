import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Fecha } from 'src/app/modelos/fecha.model';
import { ForoService } from 'src/app/services/foro/foro.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-breaks-sheet',
  templateUrl: './breaks.sheet.component.html',
  styleUrls: ['./breaks.sheet.component.css']
})
export class BreaksSheetComponent implements OnInit {

  constructor(
    private _foroService: ForoService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Fecha
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  guardarBreak(event: MatCheckboxChange, intervalo: Fecha["intervalos"]) {
    intervalo.break = !intervalo.break;
    if (event.checked) {
      this._foroService.agregarBreak(this.data.fecha, {
        hora: intervalo.hora,
        posicion: intervalo.posicion,
      }).pipe(
        catchError(() => {
          intervalo.break = !intervalo.break;
          return of([]);
        })
      ).subscribe();
    } else {
      this._foroService.eliminarBreak(this.data.fecha, intervalo.posicion).pipe(
        catchError(() => {
          intervalo.break = !intervalo.break;
          return of([]);
        })
      ).subscribe();
    }
  }

  
}
