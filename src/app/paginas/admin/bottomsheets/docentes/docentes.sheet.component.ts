import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Usuario } from 'src/app/modelos/usuario.model';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-docentes-sheet',
  templateUrl: './docentes.sheet.component.html',
  styleUrls: ['./docentes.sheet.component.css']
})
export class DocentesSheetComponent implements OnInit {
  docentes: any;


  constructor(private bottomSheetRef: MatBottomSheetRef<DocentesSheetComponent>,
    private proyectoService: ProyectoService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

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
    docente.jurado = !docente.jurado;
    if (event.checked)
      this.proyectoService.asignarJurado(this.data.folio, docente).subscribe(() => this.agregarJurado(docente.num_control));
    else
      this.proyectoService.eliminarJurado(this.data.folio, docente).subscribe(() => this.quitarJurado(docente.num_control));
  }

  agregarJurado(num_control: string) {
    this.data.jurado.push({ num_control: num_control });
  }

  quitarJurado(num_control: string) {
    this.data.jurado = this.data.jurado.filter(jurado => jurado.num_control !== num_control);
  }
 
}
