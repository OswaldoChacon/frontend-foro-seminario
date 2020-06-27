import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-jurado',
  templateUrl: './jurado.dialog.component.html',
  styleUrls: ['./jurado.dialog.component.css']
})
export class JuradoDialogComponent implements OnInit {

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
