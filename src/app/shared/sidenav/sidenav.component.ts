import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {  
  mobileQuery: MediaQueryList;
  roles: string[];  
  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private router: Router,
    private media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(min-width:1280px)');
        
  }

  ngOnInit(): void {        
    this.roles = this.authService.getRoles();  
    if(this.router.url.includes("Administrador") && this.roles.includes("Administrador"))
      this.permissionsService.addPermission("Administrador");
    else if(this.router.url.includes("Docente") && this.roles.includes("Docente"))
      this.permissionsService.addPermission("Docente");
    else if(this.router.url.includes("Alumno") && this.roles.includes("Alumno"))
      this.permissionsService.addPermission("Alumno");    
  }
  logout(){
    this.authService.logout();
  }
  contarRoles(){
    return this.roles?.length;
  }
  ngOnDestroy(): void {    
    this.permissionsService.flushPermissions();    
  }
}
