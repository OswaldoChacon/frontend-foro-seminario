import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.dialog.component.html',
  styleUrls: ['./confirmacion.dialog.component.css']
})
export class ConfirmacionDialogComponent implements OnInit {

  
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    
    ngOnInit(): void {
    }
    
    cerrarDialogo(): void {
      this.dialogRef.close(false);
    }
    confirmado(): void {
      this.dialogRef.close(true);
    }
}
