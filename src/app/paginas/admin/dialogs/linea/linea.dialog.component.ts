import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Linea } from 'src/app/modelos/linea.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-lineas',
  templateUrl: './linea.dialog.component.html',
  styleUrls: ['./linea.dialog.component.css']
})
export class LineaDialogComponent implements OnInit {

  formLinea = this._formBuilder.group({
    clave: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required])
  });  
  editar: boolean = false;  

  constructor(
    private _formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { data: Linea, url: string },
    private _dialogRef: MatDialogRef<LineaDialogComponent>,
    private _lineaService: LineaService) {
      _dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.data) {
      this.editar = true;
      this.formLinea.setValue({
        clave: this.data.data.clave,
        nombre: this.data.data.nombre
      });      
    }
  }

  guardarLinea() {
    this._lineaService.guardarLinea(this.formLinea, this.data.url).subscribe(()=>this._dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarLinea() {    
    this._lineaService.actualizarLinea(this.data.data.clave, this.formLinea, this.data.url).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }  
}
