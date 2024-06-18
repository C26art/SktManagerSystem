import { Injectable } from '@angular/core';
import { AuthService } from './autho.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { GlobalConstants } from '../src/app/shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBarService: SnackbarService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoleArray = route.data['expectedRole'];

    const token: any = localStorage.getItem('token');
    let tokenPayLoad: any;

    try {
      tokenPayLoad = jwtDecode(token);
    } catch (err) {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    const expectedRole = expectedRoleArray.find((role: string) => role === tokenPayLoad.role);

    if (tokenPayLoad.role === 'user' || tokenPayLoad.role === 'admin') {
      if (this.auth.isAuthenticated() && tokenPayLoad.role === expectedRole) {
        return true;
      }
      this.snackBarService.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
