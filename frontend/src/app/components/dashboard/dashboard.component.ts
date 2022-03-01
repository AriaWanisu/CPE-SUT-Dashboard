import { Component, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  total: any;
  thisyear: any;

  students: any;
  token: any;
  gender: any;
  male: any;
  female: any;
  
  retire: string;
  r: any = [];

  ngAfterViewInit(): void {
    this.token = this.local.get('user').token;

    this.ss.getStudentGender(this.token).subscribe(
      (res) => {

        this.gender = res;

        let term = res.map(res => res.term);
        let male = res.map(res => res.male);
        let female = res.map(res => res.female);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.male = male[i-1]+male[i];
            this.female = female[i-1]+female[i];
          }
        }
      });

    this.ss.getStudent(this.token).subscribe(
      (data) => {
        this.students = data;

        let term = data.map(data => data.term);
        let total = data.map(data => data.total);
        let year1 = data.map(data => data.year1);
        let year2 = data.map(data => data.year2);
        let year3 = data.map(data => data.year3);
        let year4 = data.map(data => data.year4);
        let year5up = data.map(data => data.year5up);

        let allTotal = [];
        let year = [];
        let total1 = [];
        let total2 = [];
        let allyear1 = [];
        let allyear2 = [];
        let allyear3 = [];
        let allyear4 = [];
        let allyear5 = [];
        
        for(var i = 0; i < this.students.length; i++){
          if(term[i-1] == term[i]){
            allTotal.push(total[i]+total[i-1]);
            year.push(term[i]);
            allyear1.push(year1[i-1]+year1[i]);
            allyear2.push(year2[i-1]+year2[i]);
            allyear3.push(year3[i-1]+year3[i]);
            allyear4.push(year4[i-1]+year4[i]);
            allyear5.push(year5up[i-1]+year5up[i]);
          }
          if(this.students[i].course == "วิศวกรรมคอมพิวเตอร์-2554"){
            total1.push(total[i]);
          }
          else if(this.students[i].course == "วิศวกรรมคอมพิวเตอร์-2560"){
            total2.push(total[i]);
          }
        }

        this.total = allTotal[allTotal.length-1]
        this.thisyear = year[year.length-1]
  });
}

  constructor(private dataser: DataService, private ss: StudentService, public local: LocalStorageService) {
  }

}
