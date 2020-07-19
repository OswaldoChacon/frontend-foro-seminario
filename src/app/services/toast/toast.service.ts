import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showToastOk(mensaje,titulo){
    this.toastr.success(mensaje, titulo,{
      // progressBar: true,
       tapToDismiss: true,
       closeButton: true
    })
  }
  showToastError(mensaje,titulo)
  {
    this.toastr.error(mensaje, titulo,{
      // progressBar: true,
       tapToDismiss: true
    })
  }
}
