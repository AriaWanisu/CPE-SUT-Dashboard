import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-gpa',
  templateUrl: './gpa.component.html',
  styleUrls: ['./gpa.component.css']
})
export class GpaComponent implements OnInit {

  // start
  token: any;
  subjects: any;
  subjectList: any;
  oneSubject: any;

  // target subject
  targetSubject: any;
  year: any;
  term: any;

  //chart
  avgChart: any;
  gradeHistrogram: any;
  getAChart: any;

  targetSubjectForm = new FormGroup({
    year: new FormControl('เลือกปีการศึกษา'),
    term: new FormControl('เลือกเทอม'),
    subject: new FormControl('เลือกวิชา')
  })

  constructor(public local: LocalStorageService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.subjectService.getSubject(this.token).subscribe(
      (res) => {
        this.subjects = res;

        let subject = res.map(res => res.subject);
        let allSubject = [];
    
        allSubject.push(subject[0]);
        
        for(var i = 1; i < this.subjects.length; i++){
          let check = 0;
          for(var j = 0; j < allSubject.length; j++){
            if(subject[i] == allSubject[j]){
              check = 1;
            }
          }
          if(check == 0){
            allSubject.push(subject[i]);
          }
        }
        //end loop

        this.subjectList = allSubject;
        console.log(this.subjectList);
        
      }
    )
  }

  selectSubject(){
    if (this.avgChart) this.avgChart.destroy();
    if (this.gradeHistrogram) this.gradeHistrogram.destroy();
    if (this.getAChart) this.getAChart.destroy();
    if (this.oneSubject) this.oneSubject = null;
    this.targetSubjectForm.patchValue({year: 'เลือกปีการศึกษา', term: 'เลือกเทอม'})
    this.subjectService.getListSubject(this.targetSubjectForm.value,this.token).subscribe(
      (res) => {
        this.targetSubject = res;
        console.log(res);

        let year = res.map(res => res.year);
        let term = res.map(res => res.term);
        let f = res.map(res => res.f)
        let avg = res.map(res => res.avg_gpa)
        let a = res.map(res => res.a)

        let schoolYear = [];
        let allYear = [];

        for(var i = 0; i < this.targetSubject.length; i++){
          schoolYear.push(year[i] + '-' + term[i]);
          if(year[i] != year[i-1]){
            allYear.push(year[i]);
          }
        }

        this.year = allYear;

        // avg Chart
        this.avgChart = new Chart('avgChart', {
          type: 'line',
          data: {
            labels: schoolYear,
            datasets: [
              {
                label: 'gpa เฉลี่ย',
                data: avg
              }
            ]
          }
        })
         // end avg Chart

         // a Chart
      this.getAChart =  new Chart('getAChart',{
        type: 'bar',
        data: {
          labels: schoolYear,
          datasets:[
            {
              label: 'จำนวนนักศึกษาที่ได้เกรด A',
              data: a,
              borderColor: 'rgb(54, 235, 162)',
              //pointBackgroundColor: 'rgb(54, 235, 162)',
              //pointHoverBorderColor: 'rgb(54, 235, 162)',
              backgroundColor: 'rgb(54, 235, 162)',
            },
            {
              label: 'จำนวนนักศึกษาที่ได้เกรด F',
              data: f,
              borderColor: 'rgb(54, 162, 235)',
              //pointBackgroundColor: 'rgb(54, 162, 235)',
              //pointHoverBorderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgb(54, 162, 235)',
            },
          ]
        }
      })

      }
    )
  }

  selectYear(year){
    if (this.gradeHistrogram) this.gradeHistrogram.destroy();
    this.targetSubjectForm.patchValue({term: 'เลือกเทอม'})
    this.subjectService.getListSubject(this.targetSubjectForm.value,this.token).subscribe(
      (res) => {
        let studyYear = res.map(res => res.year);
        let allTerm = res.map(res => res.term);
        let thisTerm = [];
        for(var i = 0; i < this.targetSubject.length; i++){
          console.log(i);
          console.log("year : " + studyYear[i]);
          console.log("select year : " + year.target.value);
          console.log("term : " + allTerm[i]);
          if(studyYear[i] == year.target.value){
            thisTerm.push(allTerm[i]);
          }
        }
        this.term = thisTerm;
      })
  }

  selectTerm(){
    if (this.gradeHistrogram) this.gradeHistrogram.destroy();
    this.subjectService.getTargetSubject(this.targetSubjectForm.value,this.token).subscribe(
      (res) => {
        this.oneSubject = res;

        this.gradeHistrogram = new Chart('gradeHistrogram', {
          type: 'bar',
          data: {
            labels: ["A","B+","B","C+","C","D+","D","F","P","S","U"],
            datasets: [{ 
              label: "จำนวนนักศึกษา",
              data: [ 
                this.oneSubject.a,
                this.oneSubject.b_plus,
                this.oneSubject.b,
                this.oneSubject.c_plus,
                this.oneSubject.c,
                this.oneSubject.d_plus,
                this.oneSubject.d,
                this.oneSubject.f,
                this.oneSubject.p,
                this.oneSubject.s,
                this.oneSubject.u
              ],
              backgroundColor: [
                'rgba(255, 0, 0, 0.2)',
                'rgba(255, 128, 0, 0.2)',
                'rgba(255, 255, 0, 0.2)',
                'rgba(128, 255, 0, 0.2)',
                'rgba(0, 255, 0, 0.2)',
                'rgba(0, 255, 128, 0.2)',
                'rgba(0, 255, 255, 0.2)',
                'rgba(0, 128, 255, 0.2)',
                'rgba(0, 0, 255, 0.2)',
                'rgba(128, 0, 255, 0.2)',
                'rgba(255, 0, 255, 0.2)',
                'rgba(255, 0, 128, 0.2)'
              ],
              borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(255, 128, 0, 1)',
                'rgba(255, 255, 0, 1)',
                'rgba(128, 255, 0, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(0, 255, 128, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 128, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(128, 0, 255, 1)',
                'rgba(255, 0, 255, 1)',
                'rgba(255, 0, 128, 1)'
              ],
              hoverBackgroundColor: [
                'rgba(255, 0, 0, 0.1)',
                'rgba(255, 128, 0, 0.1)',
                'rgba(255, 255, 0, 0.1)',
                'rgba(128, 255, 0, 0.1)',
                'rgba(0, 255, 0, 0.1)',
                'rgba(0, 255, 128, 0.1)',
                'rgba(0, 255, 255, 0.1)',
                'rgba(0, 128, 255, 0.1)',
                'rgba(0, 0, 255, 0.1)',
                'rgba(128, 0, 255, 0.1)',
                'rgba(255, 0, 255, 0.1)',
                'rgba(255, 0, 128, 0.1)'
              ],
              hoverBorderColor: [
                'rgba(255, 0, 0, 0.5)',
                'rgba(255, 128, 0, 0.5)',
                'rgba(255, 255, 0, 0.5)',
                'rgba(128, 255, 0, 0.5)',
                'rgba(0, 255, 0, 0.5)',
                'rgba(0, 255, 128, 0.5)',
                'rgba(0, 255, 255, 0.5)',
                'rgba(0, 128, 255, 0.5)',
                'rgba(0, 0, 255, 0.5)',
                'rgba(128, 0, 255, 0.5)',
                'rgba(255, 0, 255, 0.5)',
                'rgba(255, 0, 128, 0.5)'
              ],
              borderWidth: 1,
              barPercentage: 1,
              categoryPercentage: 1
            }],
          }
        })
        
      }
    )
  }
}
