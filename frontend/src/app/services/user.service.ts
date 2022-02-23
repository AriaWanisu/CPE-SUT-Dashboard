import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  getUser(){
    return this.http.get<any>('http://localhost:3000/api/user/'+this.local.get('user').result.email).pipe(map(data => {
      if(data){
        this.user = data;
      }
      return this.user
    }));
  }

  updateUser(id: any,userdata: any){

    const url = 'http://localhost:3000/api/user/';

    return this.http.put<any>(url+id, userdata)
      .pipe(map(data => {
        if(data){
          if(data.status == true){
            console.log(data);
          }
        }
        return data;
      }));
  }

  changePassword(id: any,pwd: any){

    const url = 'http://localhost:3000/login/password/'

    return this.http.put<any>(url+id, pwd)
     .pipe(map(data => {
       if(data){
         if(data.status == true){
          console.log(data);
         }
       }
       return data;
     }));
  }

}
