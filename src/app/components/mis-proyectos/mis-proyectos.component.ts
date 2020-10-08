import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];  
  constructor(private _proyectoService: ProyectosService) { }

  ngOnInit(): void {
    this._proyectoService.misProyectos().subscribe(proyectos => this.proyectos = proyectos);
  }

  permitirCambios(proyecto: Proyecto, cambio: boolean) {
    this._proyectoService.permitirCambios(proyecto, cambio).subscribe();

  }
}
