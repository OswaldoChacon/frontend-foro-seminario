import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import {
  FormGroupDirective,
} from "@angular/forms";
import { ForoService } from "src/app/services/foro/foro.service";
import { finalize } from "rxjs/operators";
import { Foro } from 'src/app/modelos/foro.model';

@Component({
  selector: "app-registrar-proyecto",
  templateUrl: "./registrar-proyecto.component.html",
  styleUrls: ["./registrar-proyecto.component.css"],
})
export class RegistrarProyectoComponent implements OnInit, AfterViewChecked{
  cargando: boolean = true;  
  foro: Foro;
  form:FormGroupDirective;
  // guardando:boolean = false;

  constructor(    
    private _foroService: ForoService,    
    private cdRef:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._foroService.foroActual().pipe(
      finalize(() => (this.cargando = false))
    ).subscribe((res) => {
      this.foro = res.foro;      
    });
    
  }

  ngAfterViewChecked(): void {   
    this.cdRef.detectChanges();
  }

  onSubmit() {        
    this.form.ngSubmit.emit();    
  }

}
