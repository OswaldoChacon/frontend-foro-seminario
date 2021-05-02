import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  usuario: Usuario;
  formPerfil = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required]),
    apellidoP: new FormControl('', [Validators.required]),
    apellidoM: new FormControl('', [Validators.required]),
    num_control: new FormControl('', [Validators.required])
  });


  ngOnInit(): void {
    this.authService.datosPersonales().subscribe((usuario) => {
      this.cargarDatosFormulario(usuario);
    });
    this.usuario = JSON.parse(localStorage.getItem('profile'));

  }

  actualizarDatos() {
    this.authService.actualizarDatos(this.formPerfil, this.usuario.num_control).subscribe()
  }

  cargarDatosFormulario(usuario) {
    this.formPerfil.setValue({
      email: usuario.email,
      nombre: usuario.nombre,
      apellidoP: usuario.apellidoP,
      apellidoM: usuario.apellidoM,
      num_control: usuario.num_control
    });
  }

}
