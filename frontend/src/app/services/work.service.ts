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

  getWork(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/work';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.work = data;
        console.log(this.work);
      }
      return this.work
    }));
  }

}
