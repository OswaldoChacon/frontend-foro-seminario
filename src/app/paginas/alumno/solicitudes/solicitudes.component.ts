import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  
  constructor(
   
  ) { }

  ngOnInit(): void {
   
  }
  setBackgroundColor(value: string) {
    switch (value) {
      case 'REGISTRO DE PROYECTO':
        return 'green';
      case 'CAMBIO DE TITULO DEL PROYECTO':
        return '#3E8EE8';
      case 'CANCELACION DEL PROYECTO':
        return 'red';
      case 'DAR DE BAJA A UN INTEGRANTE':
        return 'red';
      case 'CAMBIO DE ASESOR':
        return '#79D488';
    }
  }

  iconos(value: string) {
    switch (value) {
      case 'REGISTRO DE PROYECTO':
        return 'book';
      case 'CAMBIO DE TITULO DEL PROYECTO':
        return 'compare_arrows';
      case 'CANCELACION DEL PROYECTO':
        return 'cancel';
      case 'DAR DE BAJA A UN INTEGRANTE':
        return 'exit_to_app';
      case 'CAMBIO DE ASESOR':
        return 'autorenew';
    }
  }
  
}
