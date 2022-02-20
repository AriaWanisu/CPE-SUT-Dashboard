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
    const url = 'http://localhost:3000/api/subject';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.subject = data;
        console.log(this.subject);
      }
      return this.subject
    }));
  }

}
