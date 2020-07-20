import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-horario-jurado',
  templateUrl: './horario-jurado.dialog.component.html',
  styleUrls: ['./horario-jurado.dialog.component.css']
})
export class HorarioJuradoDialogComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
