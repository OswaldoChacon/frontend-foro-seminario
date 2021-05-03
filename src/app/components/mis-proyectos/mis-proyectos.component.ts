import { Component, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.proyectoService.misProyectos().subscribe(proyectos => this.proyectos = proyectos);
  }

  permitirCambios(proyecto: Proyecto, cambio: boolean) {
    this.proyectoService.permitirCambios(proyecto, cambio).subscribe();
  }
}
