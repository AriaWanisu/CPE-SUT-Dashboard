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
  difChart: any;

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
    if (this.difChart) this.difChart.destroy();
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
        let b2 = res.map(res => res.b_plus);
        let b = res.map(res => res.b);
        let c2 = res.map(res => res.c_plus);
        let c = res.map(res => res.c);
        let d2 = res.map(res => res.d_plus);
        let d = res.map(res => res.d);
        let p = res.map(res => res.p);
        let s = res.map(res => res.s);
        let u = res.map(res => res.u);

        let schoolYear = [];
        let allYear = [];
        let pass = [];
        let fail = []
        let a2c = [];
        let d2f = [];

        for(var i = 0; i < this.targetSubject.length; i++){
          schoolYear.push(year[i] + '-' + term[i]);
          pass.push(parseInt(a[i])+parseInt(b2[i])+parseInt(b[i])+parseInt(c2[i])+parseInt(c[i])+parseInt(d2[i])+parseInt(d[i])+parseInt(s[i]));
          fail.push(parseInt(f[i])+parseInt(u[i]));
          a2c.push(parseInt(a[i])+parseInt(b2[i])+parseInt(b[i])+parseInt(c2[i])+parseInt(c[i])+parseInt(s[i]));
          d2f.push(parseInt(d2[i])+parseInt(d[i])+parseInt(f[i])+parseInt(u[i]))
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
              label: 'จำนวนนักศึกษาที่ได้เกรด A ถึง C',
              data: a2c,
              borderColor: 'rgb(54, 235, 162)',
              //pointBackgroundColor: 'rgb(54, 235, 162)',
              //pointHoverBorderColor: 'rgb(54, 235, 162)',
              backgroundColor: 'rgb(54, 235, 162)',
            },
            {
              label: 'จำนวนนักศึกษาที่ได้เกรด D+ ถึง F',
              data: d2f,
              borderColor: 'rgb(54, 162, 235)',
              //pointBackgroundColor: 'rgb(54, 162, 235)',
              //pointHoverBorderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgb(54, 162, 235)',
            },
          ]
        }
      })

      //dif Chart
      this.difChart = new Chart('difChart',{
        type: 'bar',
        data: {
          labels: schoolYear,
          datasets: [
            {
              label: 'ผ่านรายวิชา',
              data: pass
            },
            {
              label: 'ไม่ผ่านรายวิชา',
              data: fail
            },
            {
              label: 'ติด P',
              data: p
            }
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
