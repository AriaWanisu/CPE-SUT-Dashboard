import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  analysisList: any;
  analysis: any;

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  getAnalysisList(token: any){
    
    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/analysis';

    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.analysisList = data;
      }
      return this.analysisList
    }));
  }

  getAnalysis(index: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/analysis/';
    
    return this.http.get<any>(url+index,{headers}).pipe(map(data => {
      if(data){
        this.analysis = data;
      }
      return this.analysis
    }));
  }

  editAnalysis(index: any,token: any, data: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/analysis/';

    return this.http.put<any>(url+index,data,{headers}).pipe(map(data => {
      if(data){
        if(data.status == true){
          console.log(data);
        }
      }
      return data;
    }));
  }
}
