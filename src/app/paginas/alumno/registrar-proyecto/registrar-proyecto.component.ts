import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import {
  FormBuilder,  
  FormGroupDirective,
} from "@angular/forms";
import { ForoService } from "src/app/services/foro/foro.service";
import { finalize } from "rxjs/operators";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";
import { Router } from '@angular/router';
import { Foro } from 'src/app/modelos/foro.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Linea } from 'src/app/modelos/linea.model';


@Component({
  selector: "app-registrar-proyecto",
  templateUrl: "./registrar-proyecto.component.html",
  styleUrls: ["./registrar-proyecto.component.css"],
})
export class RegistrarProyectoComponent implements OnInit, AfterViewChecked{
  cargando: boolean = true;  
  foro: Foro;
  form:FormGroupDirective;

  
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
