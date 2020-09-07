import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { Foros } from 'src/app/modelos/foro.model';
import { Usuario } from 'src/app/modelos/usuario.model';
import { Linea } from 'src/app/modelos/linea.model';
import { finalize } from 'rxjs/operators';
import { ForoService } from 'src/app/services/foro/foro.service';
import { Proyectos } from 'src/app/modelos/proyectos.model';
import { LineaService } from 'src/app/services/linea/linea.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-proyecto',
  templateUrl: './formulario-proyecto.component.html',
  styleUrls: ['./formulario-proyecto.component.css']
})
export class FormularioProyectoComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Output() formulario = new EventEmitter<any>();
  @Input() proyecto: Proyectos;

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
  foro: Foros;

  constructor(
    private _formBuilder: FormBuilder,
    private _proyectoService: ProyectosService,
    private _lineaService : LineaService,
    private _foroService: ForoService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    // console.log(this.proyecto);
    if (this.proyecto) {
      this.editar = true;
      this.cargarData();
    }
    // else{
      // this._lineaService.getLineas('lineas').subscribe(res=>this.lineas);
      // this._lineaService.getLineas('tiposProyecto').subscribe(res=>this.tipos);
    // }
    this._lineaService.getLineas('lineas').subscribe(lineas=>this.lineas=lineas);
    this._lineaService.getLineas('tiposProyecto').subscribe(tipos=>this.tipos=tipos);
    this._usuarioService.getDocentes().subscribe(docentes=>this.docentes=docentes);    
  }

  ngAfterViewInit(): void {
    this.formulario.emit(this.form);
  }

  registrarProyecto() {
    // this.form.ngSubmit.emit();
    this._proyectoService.registrarProyecto(this.formRegistrar.value).subscribe();
  }

  actualizarProyecto() {
    console.log("l");
    // this._proyectoService.registrarProyecto(this.formRegistrar.value).subscribe();
  }

  cargarData() {
    this.formRegistrar.get('titulo').setValue(this.proyecto.titulo);
    this.formRegistrar.get('linea').setValue(this.proyecto.lineadeinvestigacion.clave);
    this.formRegistrar.get('tipo').setValue(this.proyecto.tipos_proyectos.clave);
    this.formRegistrar.get('asesor').setValue(this.proyecto.asesora.num_control);
    this.formRegistrar.get('empresa').setValue(this.proyecto.empresa);
    this.formRegistrar.get('objetivo').setValue(this.proyecto.objetivo);    
  }

}
