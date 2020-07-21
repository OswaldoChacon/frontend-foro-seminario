import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.dialog.component.html',
  styleUrls: ['./forgot-password.dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {

  formEmail = this._formBuilder.group({
    email: new FormControl('',[Validators.required,Validators.email])
  });
  constructor(private _authService: AuthService,
    private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }
  enviarPassword(){
    this._authService.forgotPassword(this.formEmail.value).subscribe();
  }

}
