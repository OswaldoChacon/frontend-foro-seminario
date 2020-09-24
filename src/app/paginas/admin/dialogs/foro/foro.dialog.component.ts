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

  @Output() guardandoStatus = new EventEmitter<boolean>();
  @Output() formulario = new EventEmitter<FormGroupDirective>();
  anios = [];
  guardando: boolean = false;
  formForo = new FormGroup(({
    no_foro: new FormControl('', [Validators.required]),
    nombre: new FormControl('FORO DE PROPUESTAS DE PROYECTOS PARA TITULACIÓN INTEGRAL', [Validators.required]),
    periodo: new FormControl('', [Validators.required]),
    anio: new FormControl('', [Validators.required]),
    fecha_limite: new FormControl('')
  }));
  editar: boolean = false;
  constructor(private _foroService: ForoService,
    private _dialog: MatDialogRef<ForoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Foro) {
    _dialog.disableClose = true;
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
    this.guardando = true;
    this._foroService.guardarForo(this.formForo).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' })
    );
  }

  actualizarForo() {
    this.guardando = true;
    this._foroService.actualizarForo(this.data.slug, this.formForo).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }))
  }

  cargarDatosFormulario() {    
    // if (this.data.fecha_limite) {
    //   this.data.fecha_limite = new Date(this.data.fecha_limite);
    //   this.data.fecha_limite.setMinutes(this.data.fecha_limite.getMinutes() + this.data.fecha_limite.getTimezoneOffset());
    // }
    this.formForo.setValue({
      no_foro: this.data.no_foro,
      nombre: this.data.nombre,
      periodo: this.data.periodo,
      anio: this.data.anio,
      fecha_limite: this.data.fecha_limite
    });
  }
}
