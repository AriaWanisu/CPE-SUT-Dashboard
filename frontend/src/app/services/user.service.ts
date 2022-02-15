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
        console.log(this.user);
      }
      return this.user
    }));
  }
}
