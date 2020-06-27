import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  screenWidth: number;
  roles: string[];  
  constructor(
    private permissionsService: NgxPermissionsService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
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
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.permissionsService.flushPermissions();    
  }
}
