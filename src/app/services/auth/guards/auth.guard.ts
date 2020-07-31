import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  // next: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  canActivate(route: ActivatedRouteSnapshot) {    
    if (this.authService.loggedIn() && this.authService.getRoles().includes(route.data.rol)) {
      // this.authService.redirectLogin();
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
}
