import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  subject: any;

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  getSubject(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/subjects';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.subject = data;
      }
      return this.subject
    }));
  }

  getOneSubject(id: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/subject/';
    
    return this.http.get<any>(url+id,{headers}).pipe(map(data => {
      if(data){
        this.subject = data;
        console.log(this.subject);
      }
      return this.subject
    }));
  }

  getListSubject(item: any, token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/subject';
    
    return this.http.put<any>(url, item, {headers}).pipe(map(data => {
      if(data){
        this.subject = data;
        console.log(this.subject);
      }
      return this.subject
    }));
  }

  getTargetSubject(item: any, token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/targetSubject';
    
    return this.http.put<any>(url, item, {headers}).pipe(map(data => {
      if(data){
        this.subject = data;
        console.log(this.subject);
      }
      return this.subject
    }));
  }

  //insert
  addSubject(Data: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/subject';

    return this.http.post<any>(url, Data, {headers})
     .pipe(map(data => {
       if(data){
        this.subject = data;
       }
       return data;
     }));
  }

  //update
  updateSubject(id: any, data: any, token: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/subject/';

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
   deleteSubject(id: any){

    const headers = {'Authorization': this.local.get('user').token};
    const url = 'http://localhost:3000/api/subject/';
    
    return this.http.delete<any>(url+id, {headers})
      .pipe(map(data => {
        if(data){
          console.log(data);
        }
      }));
  }

}
