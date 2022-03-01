import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  gender: any;
  token: any;
  genderChart: any;
  pieChart: any;
  thisMale: any;
  thisFemale: any;
  oldChart: any;
  newChart: any;

  constructor(private studentServices: StudentService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        this.gender = res;
        console.log(this.gender);
        
        let term = res.map(res => res.term);
        let course = res.map(res => res.course);
        let male = res.map(res => res.male);
        let female = res.map(res => res.female);
        let total = res.map(res => res.total);

        let year = [];
        let totalM = [];
        let totalF = [];
        let oldMale = [];
        let oldFemale = [];
        let newMale = [];
        let newFemale = [];

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            year.push(term[i]);
            totalM.push(male[i-1]+male[i]);
            totalF.push(female[i-1]+female[i])
          }
          if(course[i] == "วิศวกรรมคอมพิวเตอร์-2554"){
            oldMale.push(male[i]);
            oldFemale.push(female[i]);
          } else if(course[i] == "วิศวกรรมคอมพิวเตอร์-2560"){
            newMale.push(male[i]);
            newFemale.push(female[i]);
          }
        }

        console.log(oldMale);
        

        this.oldChart = new Chart('oldChart', {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'นักศึกษาชาย',
                data: oldMale
            },
            {
                label: 'นักศึกษาหญิง',
                data: oldFemale
            }]
          }
        });

        this.newChart = new Chart('newChart', {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'นักศึกษาชาย',
                data: newMale
            },
            {
                label: 'นักศึกษาหญิง',
                data: newFemale
            }]
          }
        });
        
        this.pieChart = new Chart('pieChart',{
          type: 'pie',
          data: {
            labels: ["นักศึกษาชาย","นักศึกษาหญิง"],
            datasets: [{
              data: [totalM[totalM.length-1],totalF[totalF.length-1]]
            }]
          }
        })

        this.genderChart = new Chart("genderChart", {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'นักศึกษาชาย',
                data: totalM,
                order: 1
              },
              {
                label: "นักศึกษาหญิง",
                data: totalF,
                order: 1
              },
            ]
          }
        })

      }
    );
  }

  getMale(){
    this.token = this.local.get('user').token;

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        let term = res.map(res => res.term);
        let male = res.map(res => res.male);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.thisMale = male[i-1]+male[i];
          }
        }
      });

      return this.thisMale
  }

  getFemale(){
    this.token = this.local.get('user').token;

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        let term = res.map(res => res.term);
        let female = res.map(res => res.female);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.thisFemale = female[i-1]+female[i];
          }
        }
      });

      return this.thisFemale
  }

}
