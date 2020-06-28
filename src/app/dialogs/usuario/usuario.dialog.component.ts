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
import { UsersService } from "src/app/services/usuarios/users.service";
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
  formUsuario = this.formBuilder.group({      
    email: ["", [Validators.required, Validators.email]],
    nombre: new FormControl("", [Validators.required]),
    apellidoP: new FormControl("", [Validators.required]),
    apellidoM: new FormControl("", [Validators.required]),
    num_control: new FormControl("", [Validators.required])
  });
  guardando: boolean = false;
  editar: boolean = false;  
  // @Output() formularioLinea = new EventEmitter<User>();

  @ViewChild("form") form:FormGroupDirective;// myNgForm;  

  constructor(
    private formBuilder: FormBuilder,    
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Usuario,    
    private usersServices: UsersService,    
    private dialog: MatDialogRef<UsuarioDialogComponent>
  ) {    
    dialog.disableClose = true;
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
    this.usersServices.guardarUsuario(this.formUsuario.value).pipe(
      finalize(()=>this.guardando = false)
    ).subscribe(
      (res: any) => {                           
        this.dialog.close();                
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
    this.usersServices.actualizarUsuario(this.data.num_control, this.form.value).pipe(    
      finalize(()=>this.guardando=false)
      )
    .subscribe(
      res=>this.dialog.close(),
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
