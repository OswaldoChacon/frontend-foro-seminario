import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/modelos/rol.model';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { RolesService } from 'src/app/services/rol/rol.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles.dialog.component.html',
  styleUrls: ['./roles.dialog.component.css']
})
export class RolesDialogComponent implements OnInit {

  formRol = this._formBuilder.group({    
    nombre_: new FormControl('', [Validators.required])
  });
  guardando: boolean = false;
  editar: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _rolService: RolesService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { data: Rol, url: string },
    private _dialog: MatDialogRef<RolesDialogComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.data) {
      this.editar = true;      
      this.formRol.get('nombre_').setValue(this.data.data.nombre_);
    }
  }

  actualizarRol() {
    this.guardando = true;
    this._rolService.actualizarRol(this.data.data.nombre_, this.formRol, this.data.url).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(()=> this._dialog.close({ opcion: 'refresh'}));

  }

  guardarRol() {
    this.guardando = true;
    this._rolService.guardarRol(this.formRol, this.data.url).pipe(
      finalize(() => this.guardando = false)
    ).subscribe(() => this._dialog.close({ opcion: 'refresh' }));
  }

}
