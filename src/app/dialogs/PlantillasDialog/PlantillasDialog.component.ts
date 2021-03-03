import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { Plantilla } from "src/app/modelos/Plantilla.model";
import { PlantillasService } from "src/app/services/plantillas/plantillas.service";

@Component({
  selector: 'app-PlantillasDialog',
  templateUrl: './PlantillasDialog.component.html',
  styleUrls: ['./PlantillasDialog.component.css']
})
export class PlantillasDialogComponent implements OnInit {

  formPlantilla = this._formBuilder.group({
    nombre: new FormControl("", [Validators.required])
  });  
  editar: boolean = false; 

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Plantilla,
    private _formBuilder: FormBuilder,
    private _PlantillasService: PlantillasService,
    private _dialogRef: MatDialogRef<PlantillasDialogComponent>
  ) { _dialogRef.disableClose = true; }


  ngOnInit(): void {    
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }  
  
  registrarPlantilla() {    
     this._PlantillasService.guardarPlantilla(this.formPlantilla).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarPlantilla() {    
     this._PlantillasService.actualizarPlantilla(this.data.id, this.formPlantilla).subscribe(() => this._dialogRef.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario(){
    this.formPlantilla.setValue({
      nombre: this.data.nombre,
    });    
  }

}
