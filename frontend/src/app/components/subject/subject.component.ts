import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import { SubjectService } from 'src/app/services/subject.service';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  subject: any;
  token: any;
  year: any;
  term: any;
  termSubject: any;
  oneSubject: any;

  gpaChart: any;
  gpaPie: any;

  targetSubject = new FormGroup({
    year: new FormControl('เลือกปีการศึกษา'),
    term: new FormControl('เลือกเทอม'),
    subject: new FormControl('เลือกวิชา')
  })

  constructor(public local: LocalStorageService,private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.subjectService.getSubject(this.token).subscribe(
      (res) => {
        this.subject = res;
        
        let studyYear = res.map(res => res.year);
        
        let allYear = [];

        for(var i = 0; i < this.subject.length; i++){
          if(studyYear[i] != studyYear[i-1]){
            allYear.push(studyYear[i]);
          }
        }
        this.year = allYear;
        
    });
    // getSubject end

  }

  selectYear(year){
    this.subjectService.getSubject(this.token).subscribe(
      (res) => {
        let studyYear = res.map(res => res.year);
        let allTerm = res.map(res => res.term);
        let thisTerm = [];
        for(var i = 0; i < this.subject.length; i++){
          if(allTerm[i] != allTerm[i-1] && studyYear[i] == year.target.value){
            thisTerm.push(allTerm[i]);
          }
        }
        this.term = thisTerm;
      })
      
  }

  selectTerm(term){
    let thisYear = this.targetSubject.value.year;
    let thisSubject = [];
    this.subjectService.getSubject(this.token).subscribe(
      (res) => {
        let studyYear = res.map(res => res.year);
        let allTerm = res.map(res => res.term);
        let allSubject = res;
        
        for(var i = 0; i < this.subject.length; i++){
          if(allTerm[i] == term.target.value && studyYear[i] == thisYear){
            thisSubject.push(allSubject[i]);
          }
        }
        this.termSubject = thisSubject;
      })
  }

  createChart(subject){
    if (this.gpaChart) this.gpaChart.destroy();
    if (this.gpaPie) this.gpaPie.destroy();
    this.subjectService.getOneSubject(subject.target.value,this.token).subscribe(
      (res) => {
        this.oneSubject = res;
        
        this.gpaPie = new Chart('pie', {
          type: 'pie',
          data: {
            labels: ["A","B+","B","C+","C","D+","D","D+","F","P","S","U"],
            datasets: [{ 
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
              ]
            }],
          }
        })

        this.gpaChart = new Chart('gpa', {
          type: 'bar',
          data: {
            labels: ["A","B+","B","C+","C","D+","D","D+","F","P","S","U"],
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

  onClick(){
    console.log(this.targetSubject.value);
  }

}
