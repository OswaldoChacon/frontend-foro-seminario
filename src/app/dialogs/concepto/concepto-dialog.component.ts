import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Concepto } from 'src/app/modelos/concepto.model';
import { ConceptoService } from 'src/app/services/conceptos/concepto.service';
import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
@Component({
  selector: 'app-concepto',
  templateUrl: './concepto-dialog.component.html',
})
export class ConceptoDialogComponent implements OnInit {


  formConcepto = this.formBuilder.group({
    nombre: new FormControl("", [Validators.required]),
    ponderacion: new FormControl("", [Validators.required]),
    seminario: 0,
  });
  // grupo_id: localStorage.grupo_id,
  editar: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Concepto,
    private formBuilder: FormBuilder,
    private conceptoService: ConceptoService,
    private dialogRef: MatDialogRef<ConceptoDialogComponent>
  ) {
    this.dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }

  guardarConcepto() {
    this.conceptoService.guardarConcepto(this.formConcepto, localStorage.grupo_id).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarConcepto() {
    this.conceptoService.actualizarConcepto(this.data.id, this.formConcepto, localStorage.grupo_id).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario() {
    this.formConcepto.setValue({
      nombre: this.data.nombre,
      ponderacion: this.data.ponderacion,
      seminario: 0,
      grupo_id: localStorage.grupo_id,

    });
  }


}
