import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  formPassword = this.formBuilder.group({
    password: new FormControl('', [Validators.required]),
    nuevo_password: new FormControl('', [Validators.required])
  });
  hide: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
    ) { }

  ngOnInit(): void {
  }

  cambiarPassword() {
    this.usuarioService.cambiarPassword(this.formPassword).subscribe(() => this.formPassword.reset());
  }
}
