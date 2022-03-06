import { Component, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { WorkService } from 'src/app/services/work.service';  
import { GraduetedService  } from 'src/app/services/gradueted.service';
import { ScoreService } from 'src/app/services/score.service';

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

  studentChart: any;
  workChart: any;
  graduetedChart: any;
  scoreCom: any;
  scoreEng: any;
  scoreUni: any;
  relavence: any;

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

        this.studentChart = new Chart('studentChart', {
          type: 'doughnut',
          data: {
            labels: ['นักศึกษาชั้นปีที่ 1','นักศึกษาชั้นปีที่ 2','นักศึกษาชั้นปีที่ 3','นักศึกษาชั้นปีที่ 4','นักศึกษาชั้นปีที่ 5 ขึ้นไป'],
            datasets: [{ data: [allyear1[allyear1.length-1], allyear2[allyear1.length-1], allyear3[allyear1.length-1], allyear4[allyear1.length-1], allyear5[allyear1.length-1]]}]
          },
          plugins: [ChartDataLabels],
        })
  });

  this.workService.getWork(this.token).subscribe(
    (res) => {
      let work = res.map(res => res.percentGetWork);
      let not = res.map(res => res.percentNotWork);
      let study = res.map(res => res.pecrentStudy);
      let re = res.map(res => res.relevance);

      this.relavence = re[re.length-1];

      this.workChart = new Chart('workChart',{
        type: 'pie',
        data: {
          labels: ['ได้งานทำ','ยังไม่ได้งานทำ','ศึกษาต่อ'],
          datasets: [{data: [work[work.length-1], not[not.length-1], study[study.length-1]]}]
        },
        plugins: [ChartDataLabels],
      })
    }
  )

  this.scoreService.getScore(this.token).subscribe(
    (res) => {

      let year = res.map(res => res.year);
      let institute= res.map(res => res.institute);
      let avg = res.map(res => res.avg);

      for(var i = res.length-1; i >= res.length - 3; i--){
        if(institute[i] == 'สาขาวิชาวิศวกรรมคอมพิวเตอร์'){
          this.scoreCom = avg[i];
        } else if(institute[i] == 'สำนักวิชาวิศวกรรมศาสตร์'){
          this.scoreEng = avg[i];
        } else if(institute[i] == 'มหาวิทยาลัย'){
          this.scoreUni = avg[i];
        }
      }
    }
  )
}

  constructor(private dataser: DataService, private ss: StudentService, 
              public local: LocalStorageService, private workService: WorkService,
              private gs: GraduetedService, private scoreService: ScoreService) {}

}
