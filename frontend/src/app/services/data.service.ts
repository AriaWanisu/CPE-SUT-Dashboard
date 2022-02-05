import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<any>('http://localhost:3000/api/data')
      .pipe(map(data => {
        if(data) {
          this.data = data;
          console.log(this.data);
        }
        return this.data;
      }))
  }
  
}