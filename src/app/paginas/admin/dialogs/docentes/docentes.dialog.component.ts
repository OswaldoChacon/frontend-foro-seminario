import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Usuario } from "src/app/modelos/usuario.model";
import { ProyectoService } from "src/app/services/proyecto.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Proyecto } from 'src/app/modelos/proyecto.model';

@Component({
  selector: "app-docentes",
  templateUrl: "./docentes.dialog.component.html",
  styleUrls: ["./docentes.dialog.component.css"],
})
export class DocentesDiaogComponent implements OnInit {
  docentes: any;
  constructor(
    private dialogRef: MatDialogRef<DocentesDiaogComponent>,
    private proyectoService: ProyectoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Proyecto
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.docentes = JSON.parse(localStorage.getItem('docentes'));
    this.docentes.forEach((element) => {
      this.data.jurado.forEach((jurado) => {
        if (element.num_control === jurado.num_control)
          element.jurado = true;
      });
    });
  }
  
  asignarJurado(event: MatCheckboxChange, docente: Usuario) {   
    docente.jurado=!docente.jurado;
    if(event.checked)
      this.proyectoService.asignarJurado(this.data.folio,docente).subscribe(()=>this.agregarJurado(docente.num_control));
    else
      this.proyectoService.eliminarJurado(this.data.folio,docente).subscribe(()=>this.quitarJurado(docente.num_control));
  }

  agregarJurado(num_control:string){
    this.data.jurado.push({num_control:num_control});
  }
  
  quitarJurado(num_control:string){
    this.data.jurado = this.data.jurado.filter(jurado => jurado.num_control !== num_control);
  }
}
