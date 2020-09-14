import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fecha } from 'src/app/modelos/fecha.model';
import { ForoService } from 'src/app/services/foro/foro.service';

@Component({
  selector: 'app-breaksdialog',
  templateUrl: './breaks.dialog.component.html',
  styleUrls: ['./breaks.dialog.component.css']
})
export class BreaksDialogComponent implements OnInit {

  constructor(
    private _foroService: ForoService,
    @Inject(MAT_DIALOG_DATA) public data: Fecha
  ) { }

  ngOnInit(): void {
  }
  guardarBreak(event: MatCheckboxChange, intervalo: Fecha["intervalos"]) {
    if (event.checked) {
      this._foroService.agregarBreak(this.data.fecha, intervalo).subscribe();
    } else {
      this._foroService.eliminarBreak(this.data.fecha, intervalo).subscribe();
    }
  }

}
