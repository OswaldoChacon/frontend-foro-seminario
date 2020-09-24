import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder,  Validators, FormControl } from "@angular/forms";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import { Usuario } from "src/app/modelos/usuario.model";
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-agregar-usuario",
  templateUrl: "./usuario.dialog.component.html",
  styleUrls: ["./usuario.dialog.component.css"]
})
export class UsuarioDialogComponent implements OnInit {
  
  formUsuario = this._formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    nombre: new FormControl(""),
    apellidoP: new FormControl(""),
    apellidoM: new FormControl(""),
    num_control: new FormControl("", [Validators.required])
  });
  guardando: boolean = false;
  editar: boolean = false; 

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _dialog: MatDialogRef<UsuarioDialogComponent>
  ) { _dialog.disableClose = true; }


  ngOnInit(): void {
    console.log(this.formUsuario);
    if (this.data != null) {
      this.editar = true;
      this.cargarDatosFormulario();
    }
  }  
  
  registrarUsuario() {
    this.guardando = true;    
    this._usuarioService.guardarUsuario(this.formUsuario).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }));
  }

  actualizarUsuario() {
    this.guardando = true;
    this._usuarioService.actualizarUsuario(this.data.num_control, this.formUsuario).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }));
  }

  cargarDatosFormulario(){
    this.formUsuario.setValue({
      num_control: this.data.num_control,
      nombre:this.data.nombre,
      apellidoP:this.data.apellidoP,
      apellidoM:this.data.apellidoM,
      email: this.data.email
    });    
  }
}
