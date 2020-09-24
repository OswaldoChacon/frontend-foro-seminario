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
  @Input() placeholder: string;
  @Output() opcionElegida: EventEmitter<string> = new EventEmitter();  
  constructor() {}

  ngOnInit(): void {}

  seleccionarOpcion(valor: string) {    
    this.opcionElegida.emit(valor);
  }
}
