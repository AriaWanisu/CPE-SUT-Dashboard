import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  student: any;
  studentGender: any;

  constructor(private http: HttpClient,public local: LocalStorageService) { }

  getStudent(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/student';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.student = data;
      }
      return this.student
    }));
  }

  getStudentGender(token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/gender';
    
    return this.http.get<any>(url, {headers} ).pipe(map(data => {
      if(data){
        this.studentGender = data;
      }
      return this.studentGender
    }));
  }

  addStudent(Data: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/student';

    return this.http.post<any>(url, Data, {headers})
     .pipe(map(data => {
       if(data){
        this.student = data;
       }
       return data;
     }));
  }

  updateStudent(id: any, data: any, token: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/student/';

    return this.http.put<any>(url+id,data,{headers}).pipe(map(data => {
      if(data){
        if(data.status == true){
          console.log(data);
        }
      }
      return data;
    }));
  }

  deleteStudent(id: any){

    const headers = {'Authorization': this.local.get('user').token};
    const url = 'http://localhost:3000/api/student/';

    console.log("delete Work!")

    return this.http.delete<any>(url+id, {headers})
      .pipe(map(data => {
        if(data){
          console.log(data);
        }
      }));
  }

  addGender(Data: any,token: any){

    const headers = {'Authorization': token}
    const url = 'http://localhost:3000/api/gender';

    return this.http.post<any>(url, Data, {headers})
     .pipe(map(data => {
       if(data){
        this.studentGender = data;
       }
       return data;
     }));
  }

  updateGender(id: any, data: any, token: any){

    const headers = {'Authorization': token};
    const url = 'http://localhost:3000/api/gender/';

    return this.http.put<any>(url+id,data,{headers}).pipe(map(data => {
      if(data){
        if(data.status == true){
          console.log(data);
        }
      }
      return data;
    }));
  }

  deleteGender(id: any){

    const headers = {'Authorization': this.local.get('user').token};
    const url = 'http://localhost:3000/api/gender/';

    console.log("delete Work!")

    return this.http.delete<any>(url+id, {headers})
      .pipe(map(data => {
        if(data){
          console.log(data);
        }
      }));
  }

}
