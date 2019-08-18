import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Role} from '../_models';
import {AuthService} from '../_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // check if route is restricted by role
      if (next.data.roles && next.data.roles.contains(Role.Admin) && !currentUser.is_admin) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    console.log(currentUser)

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/signin'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
