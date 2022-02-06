import { Injectable } from '@angular/core';
// import ส่วนที่จะใช้งาน guard เช่น CanActivate, CanActivateChild เป็นต้นมาใช้งาน
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
// import service ที่เช็คสถานะการล็อกอินมาใช้งาน
import { AuthService } from './auth.service';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  
   // inject AuthService และ Router 
   constructor(private authService: AuthService, private router: Router, public local: LocalStorageService) {}

    // กำนหนด guard ในส่วนของการใช้งานกับ  canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('logincheck run');
    let url: string = state.url; // เก็บ url ที่พยายามจะเข้าใช้งาน
    // จะผ่านเข้าใช้งานได้เมื่อ คืนค่าเป็น true โดยเข้าไปเช็คค่าจากคำสั่ง checkLogin()
    return this.checkLogin(url); // คืนค่าการตรวจสอบสถานะการล็อกอิน
  }
 
  // ฟังก์ชั่นเช็คสถานะการล็อกอิน รับค่า url ที่ผู้ใช้พยายามจะเข้าใช้งาน
  checkLogin(url: string): boolean {
    console.log("logincheck1 Work!!")
    
    // ถ้าตรวจสอบค่าสถานะการล็อกอินแล้วเป็น true ก็ให้คืนค่า true กลับอกไป
    if (!this.authService.isLoggedIn){ return true; } // คืนค่า false กรณียังไม่ได้ล็อกอิน 

    // แต่ถ้ายังไม่ได้ล็อกอิน ให้เก็บ url ที่พยายามจะเข้าใช้งาน สำหรับไว้ลิ้งค์เปลี่ยนหน้า
    this.authService.redirectUrl = url; // redirectUrl เป็นตัวแปรที่อยู่ใน authService
    console.log("CheckLogin4 Work!!")
    // ลิ้งค์ไปยังหน้าล็อกอิน เพื่อล็อกอินเข้าใช้งานก่อน
    console.log("CheckLogin5 False!!"); 
    this.router.navigate(['/dashboard']);
    return false; // คืนค่า false กรณียังไม่ได้ล็อกอิน
  }    
 
}
