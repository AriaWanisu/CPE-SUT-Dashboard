import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn:boolean = false; // กำหนดสถานะล็อกอินเริ่มต้นเป็น false
  public redirectUrl: string; // กำหนดตัวแปรสำหรับเก็บ url ที่จะลิ้งค์ไป

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  signIn(authData: any){
    return this.http.post<any>('http://localhost:3000/login/signin', authData)
      .pipe(map(data =>{
        if(data){
          if(data.status == true){
            this.local.set('user', data, 1, 'w');
            console.log(this.local.get('user'));
            this.isLoggedIn = true;
          }
        }
        return data;
      }));
  }

  signUp(authData: any){
    return this.http.post<any>('http://localhost:3000/user/signup', authData)
      .pipe(map(data =>{
        if(data){
          console.log(data.value);
        }
        return data;
      }));
  }
}