import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Grupo } from 'src/app/modelos/grupo.model';
import { GrupoService } from 'src/app/services/grupos/grupo.service';
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo-dialog.component.html',
  styleUrls: ['./grupo-dialog.component.css']
})
export class GrupoDialogComponent implements OnInit {
  formGrupo = this.formBuilder.group({
    nombre: new FormControl("", [Validators.required]),
    ponderacion: new FormControl("", [Validators.required]),
    // plantilla_id: localStorage.plantilla_id
  });
  editar: boolean = false;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Grupo,
    private formBuilder: FormBuilder,
    private gruposService: GrupoService,
    private dialogRef: MatDialogRef<GrupoDialogComponent>
  ) { dialogRef.disableClose = true; }

  ngOnInit(): void {
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }

  cargarDatosFormulario() {
    this.formGrupo.setValue({
      nombre: this.data.nombre,
      ponderacion: this.data.ponderacion,
    });
  }

  registrarGrupo() {
    this.gruposService.guardarGrupos(this.formGrupo, localStorage.plantilla_id).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarGrupo() {
    this.gruposService.actualizarGrupo(this.data.id, localStorage.plantilla_id, this.formGrupo).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

}
