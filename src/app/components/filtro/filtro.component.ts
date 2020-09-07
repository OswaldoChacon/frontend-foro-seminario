import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filtro",
  templateUrl: "./filtro.component.html",
  styleUrls: ["./filtro.component.css"],
})
export class FiltroComponent implements OnInit {
  // opcionSeleccionada
  @Input() opciones: string[];
  @Input() defaultValue:string;
  @Output() opcionElegida: EventEmitter<string> = new EventEmitter();  
  constructor() {}

  ngOnInit(): void {}

  seleccionarOpcion(valor: string) {    
    console.log(valor);
    this.opcionElegida.emit(valor);
  }
}
