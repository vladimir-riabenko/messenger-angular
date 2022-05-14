import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {
  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = sessionStorage.getItem("jwt");
    if (token != null) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
