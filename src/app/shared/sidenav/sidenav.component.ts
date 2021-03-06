import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Usuario } from 'src/app/modelos/usuario.model';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  roles: string[];
  notificaciones: any = [];
  constructor(
    private _permissionsService: NgxPermissionsService,
    private _authService: AuthService,
    public _notificacionService: NotificacionesService,
    private _router: Router,
    private _media: MediaMatcher
  ) {
    this.mobileQuery = _media.matchMedia('(min-width:1280px)');

  }

  ngOnInit(): void {
    this._notificacionService.misNotificaciones('Foro en curso');
    this.roles = this._authService.getRoles();
    if (this._router.url.includes("administrador") && this.roles.includes("administrador"))
      this._permissionsService.addPermission("administrador");
    else if (this._router.url.includes("docente") && this.roles.includes("docente")) {
      this._permissionsService.addPermission("docente");
      if (this.roles.includes('Taller'))
        this._permissionsService.addPermission("Taller");
    }
    else if (this._router.url.includes("alumno") && this.roles.includes("alumno"))
      this._permissionsService.addPermission("alumno");
  }

  logout() {
    this._authService.logout();
  }

  contarRoles() {
    return this.roles?.length;
  }

  ngOnDestroy(): void {
    this._permissionsService.flushPermissions();
  }

  // misNotificaciones(){
  //   this._notificacionService.misNotificaciones().subscribe((res:any)=>{
  //     this.notificaciones = res;                  
  //   });
  // }

}
