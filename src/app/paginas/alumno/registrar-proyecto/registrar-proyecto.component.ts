import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import {
  FormGroupDirective,
} from "@angular/forms";
import { ForoService } from "src/app/services/foro/foro.service";
import { finalize } from "rxjs/operators";
import { Foro } from 'src/app/modelos/foro.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: "app-registrar-proyecto",
  templateUrl: "./registrar-proyecto.component.html",
  styleUrls: ["./registrar-proyecto.component.css"],
})
export class RegistrarProyectoComponent implements OnInit, AfterViewChecked {
  foro: Foro;
  form: FormGroupDirective;

  constructor(
    private _foroService: ForoService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._foroService.foroActual().subscribe(foro => this.foro = foro);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  onSubmit() {
    this.form.ngSubmit.emit();
  }

}
