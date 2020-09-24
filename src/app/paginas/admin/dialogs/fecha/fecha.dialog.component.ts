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
  guardando: boolean = false;
  editar = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<FechaDialogComponent>,
    private _foroService: ForoService,    
    @Optional() @Inject(MAT_DIALOG_DATA) private data: { data: Fecha, url: string }
  ) {
    _dialog.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.data) {
      this.editar=true;      
      this.cargarDatosFormulario();
    }
  }

  guardarFechaForo() {
    this.guardando = true;
    this._foroService.guardarFechaForo(this.data.url, this.formFechaForo).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }));  
  }

  actualizarFechaForo() {
    this.guardando = true;
    this._foroService.actualizarFechaForo(this.data.data.fecha,this.formFechaForo.value).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(
      res => this._dialog.close({ opcion: 'refresh' }),
    )
  }

  cargarDatosFormulario(){
    // if (this.data.data.fecha) {
    //   this.data.data.fecha = new Date(this.data.data.fecha);
    //   this.data.data.fecha.setMinutes(this.data.data.fecha.getMinutes() + this.data.data.fecha.getTimezoneOffset());
    // }
    console.log(this.data.data.fecha);
    this.formFechaForo.setValue({
      fecha: this.data.data.fecha,
      hora_inicio: this.data.data.hora_inicio,
      hora_termino: this.data.data.hora_termino
    })    
  }

}
