import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { Foro } from 'src/app/modelos/foro.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Linea } from 'src/app/modelos/linea.model';

import { Proyecto } from 'src/app/modelos/proyecto.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-formulario-proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.css']
})
export class FormularioProyectoComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Output() formulario = new EventEmitter<any>();
  @Output() cargarDataEmit = new EventEmitter<boolean>();
  @Input() proyecto: Proyecto;

  formRegistrar = this._formBuilder.group({
    titulo: ['', [Validators.required, Validators.maxLength(255)]],
    linea: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    asesor: new FormControl('', [Validators.required]),
    empresa: new FormControl('', [Validators.required]),
    objetivo: new FormControl('', [Validators.required, Validators.maxLength(255)]),
  });

  cargando: boolean = true;
  editar: boolean = false;
  lineas: Linea[];
  tipos: Linea[];
  docentes: Usuario[];
  foro: Foro;

  
  constructor(
    private _formBuilder: FormBuilder,
    private _proyectoService: ProyectosService,
    private _lineaService: LineaService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    if (this.proyecto) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
    this._lineaService.getLineas('alumno/lineas').subscribe(lineas => this.lineas = lineas);
    this._lineaService.getLineas('alumno/tiposProyecto').subscribe(tipos => this.tipos = tipos);
    this._usuarioService.getDocentes().subscribe(docentes => this.docentes = docentes);
  }

  ngAfterViewInit(): void {
    this.formulario.emit(this.form);
  }

  registrarProyecto() {
    this._proyectoService.registrarProyecto(this.formRegistrar).subscribe();
  }

  actualizarProyecto() {
    this._proyectoService.actualizarProyecto(this.formRegistrar, this.proyecto.folio).subscribe(() => {
      this.proyecto.enviar = false;
      this.proyecto.permitir_cambios = false;
      this.proyecto.editar = this.proyecto.aceptado ? false:true;      
    });
  }

  cargarDatosFormulario() {
    this.formRegistrar.setValue({
      titulo: this.proyecto.titulo,
      linea: this.proyecto.linea_de_investigacion.clave,
      tipo: this.proyecto.tipo_de_proyecto.clave,
      asesor: this.proyecto.asesor != null ? this.proyecto.asesor.num_control : '',
      empresa: this.proyecto.empresa,
      objetivo: this.proyecto.objetivo,
    })
    if (this.proyecto?.aceptado == 1) {
      this.formRegistrar.get('asesor').disable();
    }
  }

}
