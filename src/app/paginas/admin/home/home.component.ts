import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class HomeComponent implements OnInit {

  notificaciones: any;
  constructor(
    private _notificacionService: NotificacionesService
  ) { }

  ngOnInit(): void {
    this._notificacionService.miSolicitud().subscribe(res=>{
      this.notificaciones = res;
    });
  }

}
