import { Component, OnInit, ViewChild, Inject, Optional, Output, EventEmitter } from "@angular/core";
import {  
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective
} from "@angular/forms";
import { UsuarioService } from "src/app/services/usuario/usuario.service";
import { ToastrService } from "ngx-toastr";
import { Usuario } from "src/app/modelos/usuario.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: "app-agregar-usuario",
  templateUrl: "./usuario.dialog.component.html",
  styleUrls: ["./usuario.dialog.component.css"]
})
export class UsuarioDialogComponent implements OnInit {
  formUsuario = this._formBuilder.group({      
    email: ["", [Validators.required, Validators.email]],
    nombre: new FormControl("", [Validators.required]),
    apellidoP: new FormControl("", [Validators.required]),
    apellidoM: new FormControl("", [Validators.required]),
    num_control: new FormControl("", [Validators.required])
  });
  guardando: boolean = false;
  editar: boolean = false;  

  @ViewChild("form") form:FormGroupDirective;// myNgForm;  

  constructor(
    private _formBuilder: FormBuilder,    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario,    
    private _usuarioService: UsuarioService,    
    private _dialog: MatDialogRef<UsuarioDialogComponent>
  ) {    
    _dialog.disableClose = true;
  }


  ngOnInit(): void {    
    if (this.data != null) {
      this.editar = true;      
      this.formUsuario.controls["num_control"].setValue(this.data.num_control);
      this.formUsuario.controls["nombre"].setValue(this.data.nombre);
      this.formUsuario.controls["apellidoP"].setValue(this.data.apellidoP);
      this.formUsuario.controls["apellidoM"].setValue(this.data.apellidoM);
      this.formUsuario.controls["email"].setValue(this.data.email);
    }          
  }
  
  registrarUsuario() {
    this.guardando = true;
    this._usuarioService.guardarUsuario(this.formUsuario.value).pipe(
      finalize(()=>this.guardando = false)
    ).subscribe(
      (res: any) => {                           
        this._dialog.close({opcion:'refresh'});
      },
      (err: HttpErrorResponse) => {                
        let errores = err.error.errors;
        Object.keys(errores).forEach(fields => {
          let field = this.formUsuario.get(fields);
          if (field) {
            field.setErrors({
              serverError: errores[fields]
            });
          }
        });
      }
    );
  }
  editarUsuario() {    
    this.guardando = true;
    this._usuarioService.actualizarUsuario(this.data.num_control, this.form.value).pipe(    
      finalize(()=>this.guardando=false)
      )
    .subscribe(
      res=>this._dialog.close({opcion:'refresh'}),
      (err: HttpErrorResponse) => {        
        const errores = err.error.errors;
        Object.keys(errores).forEach(fields=>{
            const field = this.formUsuario.get(fields);
            if(field){
              field.setErrors({
                serverError: errores[fields]
              });
            }
        });
      }
    );
  }
}
