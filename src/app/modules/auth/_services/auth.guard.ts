import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Agent, Users } from 'src/app/model/model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //this.authService.logout();
    const currentUser2 = sessionStorage.getItem(this.authLocalStorageToken);
    const currentUser = this.authService.currentUserValue;
    const user:Users = JSON.parse(sessionStorage.getItem("utilisateur"));
    if (currentUser2 && user.isactive) {
      
      console.log("login")
      return true;
    }
    console.log("not login")
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
