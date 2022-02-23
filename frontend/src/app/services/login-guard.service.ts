import { Injectable } from '@angular/core';
// import ส่วนที่จะใช้งาน guard เช่น CanActivate, CanActivateChild เป็นต้นมาใช้งาน
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
// import service ที่เช็คสถานะการล็อกอินมาใช้งาน
import { AuthService } from './auth.service';
import { AuthGuardService  } from './auth-guard.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  // inject AuthService และ Router 
  constructor(private authService: AuthService, private router: Router, public local: LocalStorageService,private authGuard: AuthGuardService) {}

  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.local.get('user')!=null){ 
      console.log("didn't login")
      this.router.navigate(['/home']); 
      return false; }
    else{
      return true;
    }
  }
 
}
