import { Component, OnInit, Optional, Inject, ViewChild, Output,EventEmitter } from '@angular/core';
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
    private _dialog: MatDialogRef<ForoDialogComponent>,
    @Optional() @Inject (MAT_DIALOG_DATA) public data: Foro ) { 
      _dialog.disableClose = true;
  }

  ngOnInit(): void {    
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
    this.guardando = true;
    this._foroService.actualizarForo(this.data.slug, this.formForo.value).pipe(
      finalize(()=>this.guardando=false)
    )
    .subscribe(
      res=>this._dialog.close({opcion:'refresh'}),
      // (err: HttpErrorResponse) => {
      //   const errores = err.error.errors;
      //   Object.keys(errores).forEach(fields=>{
      //       const field = this.formForo.get(fields);
      //       if(field){
      //         field.setErrors({
      //           serverError: errores[fields]
      //         });
      //       }
      //   });
      // }
    )
  }

}
