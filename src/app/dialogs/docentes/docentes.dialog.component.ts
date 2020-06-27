import { Component, OnInit, Optional, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Usuario } from "src/app/modelos/usuario.model";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { catchError, finalize, map, tap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-docentes",
  templateUrl: "./docentes.dialog.component.html",
  styleUrls: ["./docentes.dialog.component.css"],
})
export class DocenteDiaogComponent implements OnInit {
  constructor(
    private dialog: MatDialogRef<DocenteDiaogComponent>,
    private proyectoService: ProyectosService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialog.disableClose = true;
  }

  ngOnInit(): void {
    // this.proyectoService.listarDocentes().pipe(
    //     catchError(() => {
    //       this.dialog.close();
    //       return of([]);
    //     }),
    //     map((val) => {
    //       val.forEach((element) => {
    //         this.data.jurado.forEach((jurado) => {
    //           if (element.num_control === jurado.num_control)
    //             element.jurado = true;
    //         });
    //       });
    //       return val;
    //     }),
    //     finalize(()=>this.loading = false)
    //   )
    //   .subscribe((res) => (this.docentes = res)); 
    this.data['docentes'].forEach((element) => {
      this.data['proyecto'].jurado.forEach((jurado) => {
        if (element.num_control === jurado.num_control)
          element.jurado = true;
      });
    });
  }
  ngOnDestroy(): void {
    this.data['docentes'].forEach(docente => {
      docente.jurado = false;
    });
  }
  asignarJurado(event: MatCheckboxChange, docente: Usuario) {   
    docente.jurado=!docente.jurado;
    if(event.checked)
      this.proyectoService.asignarJurado(this.data['proyecto'].folio,docente.num_control).pipe(
        catchError(()=>{           
          docente.jurado = false;          
          return of([]);
        })
      ).subscribe();
    else
      this.proyectoService.eliminarJurado(this.data['proyecto'].folio,docente.num_control).pipe(
        catchError(()=>{ 
          docente.jurado = true;
          return of([]);
        })
      ).subscribe();
  }
}
