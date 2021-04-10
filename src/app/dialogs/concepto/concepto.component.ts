import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { Concepto } from 'src/app/modelos/concepto.model';
import { ConceptoService } from 'src/app/services/conceptos/conceptos.service';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
})
export class ConceptoDialogComponent implements OnInit {

 
  formConcepto = this._formBuilder.group({
    conceptos: new FormControl("", [Validators.required]),
    ponderacion: new FormControl("", [Validators.required]),
  });  
  editar: boolean = false; 

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Concepto,
    private _formBuilder: FormBuilder,
    private _ConceptoService: ConceptoService,
    private _dialogRef: MatDialogRef<ConceptoDialogComponent>
  ) { _dialogRef.disableClose = true; }


  ngOnInit(): void {    
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }  
  
  guardarConcepto() {    
     this._ConceptoService.guardarConcepto(this.formConcepto).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarConcepto() {    
     this._ConceptoService.actualizarConcepto(this.data.id, this.formConcepto).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario(){
    this.formConcepto.setValue({
      conceptos: this.data.conceptos,
      ponderacion: this.data.ponderacion,
    });    
  }


}
