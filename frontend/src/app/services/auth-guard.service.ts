import { Injectable } from '@angular/core';
// import ส่วนที่จะใช้งาน guard เช่น CanActivate, CanActivateChild เป็นต้นมาใช้งาน
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
// import service ที่เช็คสถานะการล็อกอินมาใช้งาน
import { AuthService } from './auth.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  // inject AuthService และ Router 
  constructor(private authService: AuthService, private router: Router, public local: LocalStorageService) {}
   
  // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.local.get('user')!=null){ return true; }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
 
}