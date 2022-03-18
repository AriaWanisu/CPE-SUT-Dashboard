import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class GraduetedService {

  graduatedData: any;

  constructor(private http: HttpClient, public local: LocalStorageService) { }
  
  getGraduated(){
    return this.http.get<any>('http://localhost:3000/api/graduated')
      .pipe(map(data => {
        if(data) {
          this.graduatedData = data;
          console.log(this.graduatedData);
        }
        return this.graduatedData;
      }))
  }

  addGraduated(Data: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/graduated';

    return this.http.post<any>(url, Data, {headers})
     .pipe(map(data => {
       if(data){
        this.graduatedData = data;
       }
       return data;
     }));
  }

  updateGraduated(id: any, data: any, token: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/graduated/';

    return this.http.put<any>(url+id,data,{headers}).pipe(map(data => {
      if(data){
        if(data.status == true){
        }
      }
      return data;
    }));
  }

  deleteGraduated(id: any){

    const headers = {'Authorization': this.local.get('user').token};
    const url = 'http://localhost:3000/api/graduated/';

    console.log("delete Work!")

    return this.http.delete<any>(url+id, {headers})
      .pipe(map(data => {
        if(data){
        }
      }));
  }


}
