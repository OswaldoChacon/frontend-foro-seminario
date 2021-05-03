import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HorarioJuradoService } from 'src/app/services/horario-jurado.service';
import { Usuario } from 'src/app/modelos/usuario.model';

@Component({
  selector: 'app-horario-jurado',
  templateUrl: './horario-jurado.dialog.component.html',
  styleUrls: ['./horario-jurado.dialog.component.css']
})
export class HorarioJuradoDialogComponent implements OnInit {

  fechas: any;
  constructor(
    private _dialogRef: MatDialogRef<HorarioJuradoDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private _horarioJuradoService: HorarioJuradoService) {
    this._dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.fechas = JSON.parse(localStorage.getItem('fechas'));
    this.fechas.forEach(fecha => {
      let count = 0;
      fecha.intervalos.forEach(intervalo => {
        intervalo.selected = this.data.horarios.some(horario => intervalo.posicion === horario.posicion);
      });
      this.checkedAll(fecha);
    });
  }



  seleccionarTodos(event: MatCheckboxChange, fecha: any) {
    fecha.checked = !fecha.checked;
    if (event.checked) {
      this._horarioJuradoService.agregarHorarioAll(this.data.num_control, fecha).subscribe(() => this.checkAll(fecha));
    }
    else {
      this._horarioJuradoService.eliminarHorarioAll(this.data.num_control, fecha).subscribe(() => this.unCheckAll(fecha));
    }
  }

  agregarHora(event: MatCheckboxChange, fecha: any, intervalo: any) {
    intervalo.selected = !intervalo.selected;
    if (event.checked)
      this._horarioJuradoService.agregarHorario(this.data.num_control, fecha.fecha, intervalo).subscribe(() => {
        this.agregarHorario(intervalo.posicion);
        this.checkedAll(fecha);
      });
    else
      this._horarioJuradoService.eliminarHorario(this.data.num_control, fecha.fecha, intervalo).subscribe(() => {
        this.quitarHorario(intervalo.posicion);
        this.checkedAll(fecha);
      });
  }

  checkedAll(fecha: any) {
    const selected = fecha.intervalos.filter(intervalo => intervalo.selected === true);
    fecha.checked = selected.length === fecha.intervalos.length ? true : false;
  }

  agregarHorario(posicion: number) {
    this.data.horarios.push({ posicion: posicion })
    this.data.horarios_count += 1;
  }

  quitarHorario(posicion: number) {
    this.data.horarios = this.data.horarios.filter(intervalo => intervalo.posicion !== posicion)
    this.data.horarios_count -= 1;
  }

  checkAll(fecha: any) {
    fecha.intervalos.forEach(intervalo => {
      this.data.horarios.push({ posicion: intervalo.posicion })
      intervalo.selected = true;
    });
    this.data.horarios_count = fecha.intervalos.length;
  }

  unCheckAll(fecha: any) {
    this.data.horarios = [];
    fecha.intervalos.forEach(intervalo => {
      intervalo.selected = false;
    });
    this.data.horarios_count = 0;
  }
}
