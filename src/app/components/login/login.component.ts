import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService,
    // private router: Router,
    ) {}

  formLogin = new FormGroup({
    num_control: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hide: boolean = true;
  cargando: boolean = false;
  ngOnInit(): void {}

  login() {    
    console.log(this.formLogin.value);
    this.cargando=true;
    this._authService.login(this.formLogin.value).pipe(      
      finalize(()=>this.cargando=false)
    ).subscribe(
      (res: any) => {
        localStorage.setItem("token", res.token);        
        localStorage.setItem("profile", JSON.stringify(res.profile));                  
        this._authService.redirectLogin();        
      }     
    );    
  }
}
