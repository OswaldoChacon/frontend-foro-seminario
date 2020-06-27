import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  
  roles=[];
  screenWidth: number;
  constructor(private permissionsService: NgxPermissionsService,
    private authService: AuthService) { 
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };}

  ngOnInit(): void {    
    this.roles = this.authService.getRoles();    
    this.permissionsService.loadPermissions(this.roles);        
  }

  logout(){
    this.authService.logout();
  }
  intercambiarRol(index: number){    
    console.log(this.roles.length);
    console.log(this.roles[index]);    
  }
  contarRoles(){
    return this.roles.length;
  }
}
