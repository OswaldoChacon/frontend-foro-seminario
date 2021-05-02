import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  proyecto = {
    titulo: 'proyecto 1',
    clave: 'clave 1'
  }

  plantillas = [
    {
      nombre:'Plantilla 1',
      grupos: [
        {
          nombre: 'Nombre 1',
          ponderacion: '10'
        },
        {
          nombre: 'Nombre 2',
          ponderacion: '10'
        }
      ]
    }
  ];
  constructor(

  ) { }

  ngOnInit(): void {
  }

}
