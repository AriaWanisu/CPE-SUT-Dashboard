import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  score: any;
  
  constructor(private http: HttpClient,public local: LocalStorageService) { }

  getScore(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/score';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.score = data;
        console.log(this.score);
      }
      return this.score
    }));
  }

}
