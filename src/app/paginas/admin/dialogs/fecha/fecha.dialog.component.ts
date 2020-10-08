import { Component, OnInit, Output, EventEmitter, ViewChild, Optional, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForoService } from 'src/app/services/foro/foro.service';
import { finalize } from 'rxjs/operators';
import { Fecha } from 'src/app/modelos/fecha.model';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.dialog.component.html',
  styleUrls: ['./fecha.dialog.component.css']
})
export class FechaDialogComponent implements OnInit {

  formFechaForo = this._formBuilder.group({
    fecha: new FormControl("", [Validators.required]),
    hora_inicio: new FormControl("", [Validators.required]),
    hora_termino: new FormControl("", [Validators.required])
  });
  hoy = new Date();  
  editar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<FechaDialogComponent>,
    private _foroService: ForoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { data: Fecha, url: string }
  ) {
    _dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.data) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }

  guardarFechaForo() {    
    this._foroService.guardarFechaForo(this.data.url, this.formFechaForo).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarFechaForo() {    
    this._foroService.actualizarFechaForo(this.data.data.fecha, this.formFechaForo).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario() {
    this.formFechaForo.setValue({
      fecha: this.data.data.fecha,
      hora_inicio: this.data.data.hora_inicio,
      hora_termino: this.data.data.hora_termino
    })
  }

}
