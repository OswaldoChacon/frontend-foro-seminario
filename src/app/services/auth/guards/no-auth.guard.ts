import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  canActivate() {
    if (!this.authService.loggedIn()) {
      // this.authService.redirectLogin();
      return true;
    }
    this.authService.redirectLogin();
    // this.router.navigate(["/login"]);
    return false;
  }
  
}
