import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, public local: LocalStorageService) { }

   // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.local.get('user').result.role != "Admin"){ 
      this.router.navigate(['/dashboard']); 
      return false; }
    else{
      return true;
    }
  }

}
