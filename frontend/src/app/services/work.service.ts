import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  work: any;

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  //get
  getWork(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/work';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.work = data;
      }
      return this.work
    }));
  }

  //insert
  addWork(Data: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/work';

    return this.http.post<any>(url, Data, {headers})
     .pipe(map(data => {
       if(data){
        this.work = data;
       }
       return data;
     }));
  }

  //update
  updateWork(id: any, data: any, token: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/work/';

    return this.http.put<any>(url+id,data,{headers}).pipe(map(data => {
      if(data){
        if(data.status == true){
          console.log(data);
        }
      }
      return data;
    }));
  }

  //delete
  deleteWork(id: any){

    const headers = {'Authorization': this.local.get('user').token};
    const url = 'http://localhost:3000/api/work/';
    
    return this.http.delete<any>(url+id, {headers})
      .pipe(map(data => {
        if(data){
          console.log(data);
        }
      }));
  }

}
