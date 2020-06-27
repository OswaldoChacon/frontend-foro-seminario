import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService,
    // private router: Router,
    ) {}

  formLogin = new FormGroup({
    num_control: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  hide: boolean = true;
  cargando: boolean = false;
  ngOnInit(): void {}

  login() {    
    console.log(this.formLogin.value);
    this.cargando=true;
    this.authService.login(this.formLogin.value).pipe(
      // tap(res=>this.car=true)
      finalize(()=>this.cargando=false)
    ).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token);        
        localStorage.setItem("profile", JSON.stringify(res.profile));                  
        this.authService.redirectLogin();
        // this.autenticacionService.getRoles();
      }     
    );    
  }
}
