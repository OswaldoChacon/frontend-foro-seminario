import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.dialog.component.html',
  styleUrls: ['./forgot-password.dialog.component.css']
})
export class ForgotPasswordDialogComponent implements OnInit {

  cargando: boolean = false;
  formEmail = this.formBuilder.group({
    email: new FormControl('',[Validators.required, Validators.email])
  });
  constructor(private authService: AuthService,
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  enviarPassword() {
    this.cargando = true;
    this.authService.forgotPassword(this.formEmail).pipe(
      finalize(() => this.cargando = false)
    ).subscribe(()=>this.dialogRef.close());
  }

}
