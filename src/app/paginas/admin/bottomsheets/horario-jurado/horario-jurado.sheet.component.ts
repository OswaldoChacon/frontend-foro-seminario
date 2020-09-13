import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HorarioJuradoService } from 'src/app/services/horario/horario-jurado.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-horario-jurado-sheet',
  templateUrl: './horario-jurado.sheet.component.html',
  styleUrls: ['./horario-jurado.sheet.component.css']
})
export class HorarioJuradoSheetComponent implements OnInit {

  // @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: Usuario,
  constructor(private _bottomSheetRef: MatBottomSheetRef<HorarioJuradoSheetComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: Usuario,
    private _horarioJuradoService: HorarioJuradoService) { }
  fechas: any;
  ngOnInit(): void {
    console.log(this.data);
    this.fechas = JSON.parse(localStorage.getItem('fechas'));
    this.fechas.forEach(fecha => {
      let count = 0;
      fecha.intervalos.forEach(intervalo => {
        intervalo.selected = this.data.horarios.some(horario => intervalo.posicion === horario.posicion);
      });
      this.checkedAll(fecha);
      // let selected = fecha.intervalos.filter(intervalo => intervalo.selected === true);
      // fecha.checked = selected.length === fecha.intervalos.length ? true : false;
    });
  }



  seleccionarTodos(event: MatCheckboxChange, fecha: any) {
    fecha.checked= !fecha.checked;
    this.checkAll(fecha);
    if (event.checked) {
      this._horarioJuradoService.agregarHorarioAll(this.data.num_control, fecha).pipe(
        catchError((error)=>{
          fecha.checked= !fecha.checked;
          this.unCheckAll(fecha);
          return throwError(error);
        })
      ).subscribe(
        // ()=>this.checkAll(fecha)
        );
      
    }
    else {
      this.unCheckAll(fecha);
      this._horarioJuradoService.eliminarHorarioAll(this.data.num_control, fecha).pipe(
        catchError((error)=>{
          fecha.checked= !fecha.checked;
          this.checkAll(fecha);
          return throwError(error);
        })
      ).subscribe(
        // ()=>this.unCheckAll(fecha)
        );
    }
  }
  
  agregarHora(event: MatCheckboxChange, fecha: any, intervalo:any) {    
    intervalo.selected = !intervalo.selected;
    this.agregarHorario(intervalo.posicion);
    this.checkedAll(fecha);


    if(event.checked){
      this._horarioJuradoService.agregarHorario(this.data.num_control,fecha.fecha, intervalo.hora, intervalo.posicion).pipe(
        tap(()=>{
        //   this.agregarHorario(intervalo.posicion);
        // this.checkedAll(fecha);
        }),
        catchError((error)=>{
          this.quitarHorario(intervalo.posicion)
          this.checkedAll(fecha);


          intervalo.selected = !intervalo.selected;
          return throwError(error)
        })
      ).subscribe(()=>{
        // this.agregarHorario(intervalo.posicion);
        // this.checkedAll(fecha);
      });
    }
    else{
      this.quitarHorario(intervalo.posicion);
      this.checkedAll(fecha);


      this._horarioJuradoService.eliminarHorario(this.data.num_control,fecha.fecha,intervalo.posicion).pipe(
        tap(()=>{
          // this.quitarHorario(intervalo.posicion);
          // this.checkedAll(fecha);
        }),
        catchError((error)=>{
          this.agregarHorario(intervalo.posicion);
          this.checkedAll(fecha);

          intervalo.selected = !intervalo.selected;
          return throwError(error)
        })
      ).subscribe(()=>{
        // this.quitarHorario(intervalo.posicion);
        // this.checkedAll(fecha);
      });
    }        
  }
  
  checkedAll(fecha:any){
    const selected = fecha.intervalos.filter(intervalo => intervalo.selected === true);
    fecha.checked = selected.length === fecha.intervalos.length ? true : false;
  }

  agregarHorario(posicion:number){
    this.data.horarios.push({posicion:posicion})
  }
  
  quitarHorario(posicion:number){
    this.data.horarios = this.data.horarios.filter(intervalo => intervalo.posicion !== posicion)
  }

  checkAll(fecha: any) {
    fecha.intervalos.forEach(intervalo => {
      this.data.horarios.push({posicion:intervalo.posicion})
      intervalo.selected = true;
    });
  }
  
  unCheckAll(fecha: any) {
    this.data.horarios = [];
    fecha.intervalos.forEach(intervalo => {
      intervalo.selected = false;
    });
  }

}
