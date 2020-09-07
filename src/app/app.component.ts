import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificacionesService } from './services/notificaciones/notificaciones.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {  
  constructor(private _notificacionesService: NotificacionesService) {}
  ngOnInit() {
    // this._notificacionesService.misNotificaciones();
  }

}
