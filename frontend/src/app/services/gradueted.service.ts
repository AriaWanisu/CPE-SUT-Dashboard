import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GraduetedService {

  graduatedData: any;

  constructor(private http: HttpClient) { }
  
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
}
