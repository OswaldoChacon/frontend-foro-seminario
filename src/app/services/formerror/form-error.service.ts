import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {

  constructor() { }

  handleError(error: HttpErrorResponse, form: FormGroup){
    if(error.status === 422){
      let errores = error.error.errors;
        Object.keys(errores).forEach(fields => {
          let field = form.get(fields);
          if (field) {
            field.setErrors({
              serverError: errores[fields]
            });
          }
        });    
    }
    console.log(form);
    return throwError(error);
  }
}
