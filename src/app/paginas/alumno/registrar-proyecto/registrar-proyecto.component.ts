import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { ForoService } from "src/app/services/foro/foro.service";
import { tap, finalize, filter, map } from "rxjs/operators";
import { ProyectosService } from "src/app/services/proyectos/proyectos.service";

@Component({
  selector: "app-registrar-proyecto",
  templateUrl: "./registrar-proyecto.component.html",
  styleUrls: ["./registrar-proyecto.component.css"],
})
export class RegistrarProyectoComponent implements OnInit {
  isOpen: boolean = false;
  cargando: boolean = true;
  lineas: any;
  tipos: any;
  docentes: any;
  // periodo: any;
  foro: any;
  alumnos: any;
  lim_alumnos: number = 0;

  formRegistrar = this._formBuilder.group({
    alumnos: new FormArray([]),
    titulo: ["", [Validators.required]],
    linea: new FormControl("", [Validators.required]),
    tipo: new FormControl("", [Validators.required]),
    asesor: new FormControl("", [Validators.required]),
    empresa: new FormControl("", [Validators.required]),
    objetivo: new FormControl("", [Validators.required]),
    // alumnos: new FormControl([])
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _foroService: ForoService,
    private _proyectoService: ProyectosService
  ) {}

  ngOnInit(): void {
    this._foroService
      .foroActual()
      .pipe(finalize(() => (this.cargando = false)))
      .subscribe((res: any) => {
        this.foro = res["foro"];
        this.lineas = res["lineas"];
        this.tipos = res["tipos"];
        this.docentes = res["docentes"];
        this.alumnos = res["alumnos"];
        // for (let index = 2; index <= this.foro.lim_alumnos; index++) {
        //   this.lim_alumnos.push(index);
        // }
      });
  }
  openPanel() {
    // this.isOpen = !this.isOpen;
    const control = this.formRegistrar.get("alumnos") as FormArray;
    control.push(new FormControl());
    this.lim_alumnos = control.length;
  }
  minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) return null;

      return { minLengthArray: { valid: false } };
    };
  }
  get formData() {
    return <FormArray>this.formRegistrar.get("alumnos");
  }
  registrar() {
    this._proyectoService
      .registrarProyecto(this.formRegistrar.value)
      .subscribe();
    console.log(this.formRegistrar.value);
  }
  remove(index:number){
    const control = this.formRegistrar.get("alumnos") as FormArray;
    control.removeAt(index);
    this.lim_alumnos = control.length;
    // this.formRegistrar.get('alumnos').remove(index)
  }
}
