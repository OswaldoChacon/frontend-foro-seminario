import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { Plantilla } from "src/app/modelos/Plantilla.model";
import { PlantillaService } from "src/app/services/plantilla.service";

@Component({
  selector: 'app-plantilla-dialog',
  templateUrl: './plantilla-dialog.component.html',
  styleUrls: ['./plantilla-dialog.component.css']
})
export class PlantillasDialogComponent implements OnInit {

  formPlantilla = this.formBuilder.group({
    nombre: new FormControl("", [Validators.required])
  });  
  editar: boolean = false; 

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Plantilla,
    private formBuilder: FormBuilder,
    private plantillasService: PlantillaService,
    private dialogRef: MatDialogRef<PlantillasDialogComponent>
  ) { dialogRef.disableClose = true; }


  ngOnInit(): void {    
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }  
  
  registrarPlantilla() {    
     this.plantillasService.guardarPlantilla(this.formPlantilla).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

  actualizarPlantilla() {    
     this.plantillasService.actualizarPlantilla(this.data.id, this.formPlantilla).subscribe(() => this.dialogRef.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario(){
    this.formPlantilla.setValue({
      nombre: this.data.nombre,
    });    
  }

}
