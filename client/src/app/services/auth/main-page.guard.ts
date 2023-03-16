import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthorizationPageComponent} from "../../start-page/authorization-page/authorization-page.component";

@Injectable({
  providedIn: 'root'
})
export class MainPageGuard implements CanActivate, CanActivateChild {
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
       /*if (this.auth.isLogIn) {
         return of(true);
       } else {
         this.router.navigate(['/index']).then();
         return of(false);
       }*/
    return of(true);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
