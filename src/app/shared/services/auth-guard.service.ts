import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: UserService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
      return true;
  }
}
