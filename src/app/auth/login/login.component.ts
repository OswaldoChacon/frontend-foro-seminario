import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth/auth.service';
import { finalize } from 'rxjs/operators';
import { ForgotPasswordDialogComponent } from 'src/app/dialogs/forgot-password/forgot-password.dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private _authService: AuthService,
    private _dialog: MatDialog
  ) { }

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hide: boolean = true;
  ngOnInit(): void { }

  login() {
    this._authService.login(this.formLogin.value).subscribe();
  }

  forgotPassword() {
    const dialogRef = this._dialog.open(ForgotPasswordDialogComponent, {
      width: '400px'
    });
  }
}
