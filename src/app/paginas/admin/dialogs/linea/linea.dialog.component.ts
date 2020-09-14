import { Component, OnInit, EventEmitter, Output, Inject, Optional, ViewChild } from '@angular/core';
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
  guardando: boolean = false;
  editar: boolean = false;
  @ViewChild('form') form: FormGroupDirective;

  constructor(
    private _formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { data: Linea, url: string },
    private _dialog: MatDialogRef<LineaDialogComponent>,
    private _lineaService: LineaService) {
    _dialog.disableClose = true;
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
    this.guardando = true;
    this._lineaService.guardarLinea(this.formLinea, this.data.url).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(
      res => {
        this._dialog.close({ opcion: 'refresh' });
      }
    );
  }

  actualizarLinea() {
    this.guardando = true;
    this._lineaService.actualizarLinea(this.data.data.clave, this.formLinea, this.data.url).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }));
  }

  
}
