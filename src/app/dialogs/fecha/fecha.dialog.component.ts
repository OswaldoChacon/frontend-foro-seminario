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
import { Fechas } from 'src/app/modelos/fechas.model';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.dialog.component.html',
  styleUrls: ['./fecha.dialog.component.css']
})
export class FechaDialogComponent implements OnInit {

  @ViewChild('form') form: FormGroupDirective;  

  formFechaForo  = this._formBuilder.group({
    fecha: new FormControl("",[Validators.required]),
    hora_inicio: new FormControl("",[Validators.required]),
    hora_termino: new FormControl("",[Validators.required])
  });
  hoy = new Date();
  guardando: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialogRef<FechaDialogComponent>,
    private _foroService: ForoService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: {data:Fechas, url:string}    
  ) { 
    _dialog.disableClose = true;
  }

  ngOnInit(): void {    
    console.log(this.data);
    if(this.data.data){
      // this.data.data.fecha.setMinutes(this.data.data.fecha.getMinutes() + this.data.data.fecha.getTimezoneOffset());
      // console.log(this.data.data.fecha);
      this.formFechaForo.controls['fecha'].setValue(this.data.data.fecha);
      this.formFechaForo.controls['hora_inicio'].setValue(this.data.data.hora_inicio);
      this.formFechaForo.controls['hora_termino'].setValue(this.data.data.hora_termino);
    }    
  }

  guardarFechaForo() {
    this.guardando = true;    
    this._foroService.agregarFechaForo(this.data.url,this.formFechaForo.value).pipe(      
      finalize(()=>this.guardando=false)
    ).subscribe(
      res=>this._dialog.close({opcion: 'refresh'})
    );
    // {data: this.formFechaForo.value}


    // this.fechasDataSource.resetData();
    // this.foroService
    //   .agregarFechaForo(this.foro.slug, this.formFechaForo.value)
    //   .pipe(finalize(() => this.fechasDataSource.cambiarValorSpinner()))
    //   .subscribe((res) => {
    //     this.fechasDataSource.agregarFecha(this.formFechaForo.value);
    //     this.formFechaForo.reset();
    //     formDirective.resetForm();
    //   });
  }

  
}
