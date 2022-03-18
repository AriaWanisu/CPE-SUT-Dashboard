import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';  
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AnalysisService } from 'src/app/services/analysis.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  token: any;
  work: any;
  getWorkChart: any;
  salaryChart: any;
  relevanceChart: any;

  edit: boolean = false;
  editSR: boolean = false;
  isAdmin: boolean = false;

  config: any;
  writter: any;
  writtersalaryRelevance: any;
  user: any;

  workAnalysis: any;
  salaryRelevanceAnalysis: any;

  workAnalysisForm = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });

  salaryRelevanceAnalysisForm = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });

  constructor(private workService: WorkService,public local: LocalStorageService, private as: AnalysisService,private us: UserService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;
    //check role
    if(this.local.get('user').result.role == "Admin"){
      this.isAdmin = true;
    }

    this.us.getUser().subscribe(
      (data) => {
        this.user = data._id;
      },
      (err) => {
        console.log("can't get user");
      }
    );
    
    this.as.getAnalysis("workAnalysis",this.token).subscribe(
      (res) => {
        this.workAnalysis = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writter = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
      }
    );

    this.as.getAnalysis("salaryAndrelevance",this.token).subscribe(
      (res) => {
        this.salaryRelevanceAnalysis = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writtersalaryRelevance = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
      }
    );

    this.config = {
      placeholder: '',
      tabsize: 2,
      height: '200px',
      toolbar: [
          ['misc', ['codeview', 'undo', 'redo']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['para', ['style', 'ul', 'ol']],
          ['insert', ['table', 'hr','picture']]
      ],
    }

    this.workService.getWork(this.token).subscribe( 
      (res) => {
        this.work = res;
        console.log(this.work);

        let year = res.map(res => res.year);
        let get = res.map(res => res.percentGetWork);
        let study = res.map(res => res.pecrentStudy);
        let not = res.map(res => res.percentNotWork);
        let early = res.map(res => res.percentWorkEarly);
        let salary = res.map(res => res.avgSalary);
        let relevance = res.map(res => res.relevance);

        this.relevanceChart = new Chart("relevanceChart", {
          type: 'line',
          data: {
            labels: year,
            datasets: [
              {
                label: "อัตราการได้งานทำ",
                data: relevance,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                fill: true
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        this.salaryChart = new Chart("salaryChart", {
          type: 'line',
          data: {
            labels: year,
            datasets: [
              {
                label: "เงินเดือน",
                data: salary,
                fill: true
              }
            ]
          }
        })

        this.getWorkChart = new Chart("workChart", {
          type: "bar",
          data: {
            labels: year,
            datasets: [
              {
                label: "ได้งานทำ",
                data: get,
                stack: 'Stack 0',
              },
              {
                label: "เรียนต่อ",
                data: study,
                stack: 'Stack 0',
              },
              {
                label: "ไม่ได้งานทำ",
                data: not,
                stack: 'Stack 0',
              },
              {
                label: "ได้งานทำก่อนจบ",
                data: early,
                borderColor: 'rgba(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192)',
                stack: 'Stack 1',
              }
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true
              }
            },
            plugins: {
              datalabels: {
                formatter: (value) => {
                  return value
                },
              },
              legend: {
                position: "top"
              }
            }
          }
        });

    });

  }

  openEdit(){
    this.edit = !this.edit;
  }

  openEditSR(){
    this.editSR = !this.editSR;
  }

  editWorkAnalysis(){
    this.workAnalysisForm.value.editor = this.user;

    this.as.editAnalysis(this.workAnalysis.index,this.token,this.workAnalysisForm.value)
      .subscribe( data => {
          if(data.status == true){
            alert(data.data.message)
            window.location.reload();
        }else{
          alert('Address incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Error!!');
      });
  }

  editsalaryRelevanceAnalysis(){
    this.salaryRelevanceAnalysisForm.value.editor = this.user;

    this.as.editAnalysis(this.salaryRelevanceAnalysis.index,this.token,this.salaryRelevanceAnalysisForm.value)
      .subscribe( data => {
          if(data.status == true){
            alert(data.data.message)
            window.location.reload();
        }else{
          alert('Address incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Error!!');
      });
  }

  get text1() {
    return this.workAnalysisForm.get('text');
  }

  get text2() {
    return this.salaryRelevanceAnalysisForm.get('text');
  }

}
