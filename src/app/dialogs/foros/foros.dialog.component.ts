import { Component, OnInit, Optional, Inject, ViewChild, Output,EventEmitter } from '@angular/core';
import { ForoService } from 'src/app/services/foro/foro.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Foros } from 'src/app/modelos/foro.model';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-foros',
  templateUrl: './foros.dialog.component.html',
  styleUrls: ['./foros.dialog.component.css']
})
export class ForosDialogComponent implements OnInit {

  @ViewChild('form') form : FormGroupDirective;  
  @Output() guardandoStatus = new EventEmitter<boolean>();
  @Output() formulario = new EventEmitter<FormGroupDirective>();
  anios=[];
  guardando:boolean=false;
  formForo = new FormGroup(({
    no_foro : new FormControl("",[Validators.required]),
    nombre : new FormControl("FORO DE PROPUESTAS DE PROYECTOS PARA TITULACIÓN INTEGRAL",[Validators.required]),
    periodo : new FormControl("",[Validators.required]),
    anio : new FormControl("",[Validators.required])
  }));
  editar: boolean = false;
  constructor(private _foroService: ForoService,
    private _dialog: MatDialogRef<ForosDialogComponent>,
    @Optional() @Inject (MAT_DIALOG_DATA) public data: Foros ) { 
      _dialog.disableClose = true;
  }

  ngOnInit(): void {
    console.log(this.data);
    for(let i = 0; i <3; i++)
      this.anios.push(new Date().getFullYear()+i);    
    if(this.data != null){
      this.editar = true;
      this.formForo.get('no_foro').setValue(this.data.no_foro);
      this.formForo.get('nombre').setValue(this.data.nombre);
      this.formForo.get('periodo').setValue(this.data.periodo);
      this.formForo.get('anio').setValue(this.data.anio);
    }
  }
  guardarForo(){
    this.guardando = true;
    this._foroService.guardarForo(this.formForo.value).pipe(
      // finalize(()=>this.guardando=false)
    ).subscribe(
      res=>this._dialog.close({opcion:'refresh'})
    );    
  } 
  actualizarForo(){
    // console.log(form.value);
    this.guardando = true;
    this._foroService.actualizarForo(this.data.slug, this.formForo.value).pipe(
      finalize(()=>this.guardando=false)
    )
    .subscribe(
      res=>this._dialog.close({opcion:'refresh'}),
      (err: HttpErrorResponse) => {        
        const errores = err.error.errors;
        Object.keys(errores).forEach(fields=>{
            const field = this.formForo.get(fields);
            if(field){
              field.setErrors({
                serverError: errores[fields]
              });
            }
        });
      }
    )
  }

}
