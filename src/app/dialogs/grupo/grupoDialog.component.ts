import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { Grupo } from 'src/app/modelos/grupo.model';
import { GruposService } from 'src/app/services/grupos/grupos.service';
@Component({
  selector: 'app-grupo',
  templateUrl: './grupoDialog.component.html',
  styleUrls: ['./grupoDialog.component.css']
})
export class GrupoDialogComponent implements OnInit {
  formGrupo = this._formBuilder.group({
    nombre: new FormControl("", [Validators.required]),
    ponderacion: new FormControl("", [Validators.required]),
    // plantilla_id: localStorage.plantilla_id
  });
  editar: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Grupo,
    private _formBuilder: FormBuilder,
    private _GruposService: GruposService,
    private _dialogRef: MatDialogRef<GrupoDialogComponent>
  ) { _dialogRef.disableClose = true; }

  ngOnInit(): void {
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }

  cargarDatosFormulario(){
    this.formGrupo.setValue({
      nombre: this.data.nombre,
      ponderacion: this.data.ponderacion,      
    });
  }

  registrarGrupo() {
    this._GruposService.guardarGrupos(this.formGrupo, localStorage.plantilla_id).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
 }

 actualizarGrupo() {
  this._GruposService.actualizarGrupo(this.data.id, localStorage.plantilla_id, this.formGrupo).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
}

}
