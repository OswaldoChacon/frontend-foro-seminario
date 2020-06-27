import { Component, OnInit, Output, EventEmitter, ViewChild, Optional, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormGroupDirective,
  ValidationErrors,
} from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForosService } from 'src/app/services/foros/foros.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.dialog.component.html',
  styleUrls: ['./fecha.dialog.component.css']
})
export class FechaDialogComponent implements OnInit {

  @ViewChild('form') form: FormGroupDirective;
  @Output() formulario = new EventEmitter<any>();
  @Output() guardandoStatus = new EventEmitter<boolean>();

  formFechaForo  = this.formBuilder.group({
    fecha: new FormControl("",[Validators.required]),
    hora_inicio: new FormControl("",[Validators.required]),
    hora_termino: new FormControl("",[Validators.required])
  });
  hoy = new Date();
  guardando: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialogRef<FechaDialogComponent>,
    private foroService: ForosService,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,    
  ) { 
    dialog.disableClose = true;
  }

  ngOnInit(): void {
    this.formulario.emit(this.form);
    this.guardandoStatus.emit(this.guardando);
  }

  guardarFechaForo() {
    this.guardando = true;
    this.foroService.agregarFechaForo(this.data.slug,this.formFechaForo.value).pipe(      
      finalize(()=>this.guardando=false)
    ).subscribe(
      res=>this.dialog.close({data: this.formFechaForo.value})
    );
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
