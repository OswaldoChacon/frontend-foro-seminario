import { Component, OnInit, EventEmitter, Output, Inject, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Linea } from 'src/app/modelos/linea.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lineas',
  templateUrl: './linea.dialog.component.html',
  styleUrls: ['./linea.dialog.component.css']
})
export class LineaDialogComponent implements OnInit {
  
  formLinea = this.formBuilder.group({
    clave : new FormControl('',[Validators.required]),
    nombre : new FormControl('',[Validators.required])
  });
  guardando: boolean = false;
  editar: boolean = false;
  @ViewChild('form') form: FormGroupDirective;
  @Output() formulario = new EventEmitter<FormGroupDirective>();
  @Output() guardandoStatus = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder,   
    @Optional() @Inject (MAT_DIALOG_DATA) private data: {linea:Linea,url:string},    
    private _dialog: MatDialogRef<LineaDialogComponent>,
    private _lineaService:LineaService) {
    _dialog.disableClose = true;
   }

  ngOnInit(): void {
    if (this.data != null) {
      this.editar = true;
      this.formLinea.get('clave').setValue(this.data.linea.clave);
      this.formLinea.get('nombre').setValue(this.data.linea.nombre);      
    }    
    this.formulario.emit(this.form);
    this.guardandoStatus.emit(this.guardando);
  }
  
  editarLinea()
  {
    this.guardando = true;    
    this._lineaService.actualizarLinea(this.data.linea.clave, this.formLinea.value, this.data.url).pipe(
      finalize(()=>this.guardando=false)
      )
    .subscribe(
      (res : any)=> {              
        this._dialog.close({opcion:'refresh'});        
        // res=>this.dialog.close({opcion:'refresh'}),
      },
      (err: HttpErrorResponse) => {        
        const errores = err.error.errors;
        Object.keys(errores).forEach(fields=>{
            const field = this.formLinea.get(fields);
            if(field){
              field.setErrors({
                serverError: errores[fields]
              });
            }
        });
      }
    );
  }

  guardarLinea(){    
    this.guardando = true;
    this._lineaService.guardarLinea(this.formLinea.value,this.data.url).pipe(      
      finalize(()=>this.guardando=false)
    ).subscribe(
      res=>{        
        this._dialog.close({opcion:'refresh'});
      }
    );
    
  }
}
