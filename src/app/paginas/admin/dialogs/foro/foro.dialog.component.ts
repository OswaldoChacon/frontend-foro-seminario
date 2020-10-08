import { Component, OnInit, Optional, Inject, ViewChild, Output, EventEmitter } from '@angular/core';
import { ForoService } from 'src/app/services/foro/foro.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Foro } from 'src/app/modelos/foro.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.dialog.component.html',
  styleUrls: ['./foro.dialog.component.css']
})
export class ForoDialogComponent implements OnInit {
  
  anios = [];  
  formForo = new FormGroup(({
    no_foro: new FormControl('', [Validators.required]),
    nombre: new FormControl('FORO DE PROPUESTAS DE PROYECTOS PARA TITULACIÓN INTEGRAL', [Validators.required]),
    periodo: new FormControl('', [Validators.required]),
    anio: new FormControl('', [Validators.required]),
    fecha_limite: new FormControl('',[Validators.required])
  }));
  editar: boolean = false;
  constructor(
    private _foroService: ForoService,
    private _dialogRef: MatDialogRef<ForoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Foro) {
    _dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; i++)
      this.anios.push(new Date().getFullYear() + i);
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }

  guardarForo() {    
    this._foroService.guardarForo(this.formForo).subscribe(() => this._dialogRef.close({ opcion: 'refresh' })
    );
  }

  actualizarForo() {    
    this._foroService.actualizarForo(this.data.slug, this.formForo).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }))
  }

  cargarDatosFormulario() {
    this.formForo.setValue({
      no_foro: this.data.no_foro,
      nombre: this.data.nombre,
      periodo: this.data.periodo,
      anio: this.data.anio,
      fecha_limite: this.data.fecha_limite
    });
  }
}
