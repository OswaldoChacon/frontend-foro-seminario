import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MediaMatcher } from '@angular/cdk/layout';
import { Usuario } from 'src/app/modelos/usuario.model';
import { NotificacionesService } from 'src/app/services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  roles: string[];
  usuarioLogueado: Usuario;
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
    // this.misNotificaciones();
    this.usuarioLogueado = JSON.parse(localStorage.getItem('profile'));
    this.roles = this._authService.getRoles();
    if (this._router.url.includes("Administrador") && this.roles.includes("Administrador"))
      this._permissionsService.addPermission("Administrador");
    else if (this._router.url.includes("Docente") && this.roles.includes("Docente"))
      this._permissionsService.addPermission("Docente");
    else if (this._router.url.includes("Alumno") && this.roles.includes("Alumno"))
      this._permissionsService.addPermission("Alumno");
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
