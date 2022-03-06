import { Component, OnInit } from '@angular/core';
import { GraduetedService  } from 'src/app/services/gradueted.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AnalysisService } from 'src/app/services/analysis.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-graduated',
  templateUrl: './graduated.component.html',
  styleUrls: ['./graduated.component.css']
})
export class GraduatedComponent implements OnInit {

  token: any;

  gdata: any;
  avgChart: any;
  compareChart: any;
  anyChart: any;
  chart: any;
  avg: any;

  isAdmin: boolean = false;

  edit: boolean = false;
  editavg: boolean = false;

  config: any;
  writter: any;
  writteravg: any;
  user: any;

  graduatedAnalysis: any;
  avgAnalysis: any;

  
  graduatedForm = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });
  
  constructor(private gs: GraduetedService, public local: LocalStorageService, private as: AnalysisService,private us: UserService) {
      this.onLoading();
   }

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

    this.as.getAnalysis("graduated",this.token).subscribe(
      (res) => {
        this.graduatedAnalysis = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writter = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
        console.log(this.writter);
      }
    );
    
    //summernote config
    this.config = {
      placeholder: '',
      tabsize: 2,
      height: '200px',
      toolbar: [
          ['misc', ['codeview', 'undo', 'redo']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['para', ['style', 'ul', 'ol']],
          ['insert', ['table', 'hr', ,'picture']]
      ],
    }


    this.gs.getGraduated().subscribe(res => {
      
      let early = res.map(res => res.early);
      let normal = res.map(res => res.normal);
      let over = res.map(res => res.over);
      let other = res.map(res => res.other);
      let year = res.map(res => res.year);
      
      let sumEarly = 0;
      let sumNormal = 0;
      let sumOver = 0;
      let sumOther = 0;
      let n = 0;
      

      for(var i = 0 ; i < this.gdata.length; i++){
        sumEarly += early[i];
        sumNormal += normal[i];
        sumOver += over[i];
        sumOther += other[i];
        n++;
      }

      this.compareChart = new Chart("compare", {
        type: "line",
        data: {
          labels: year,
          datasets: [
            {
              label: "สำเร็จการศึกษก่อน4 ปี",
              data: early,
            },
            {
              label: "สำเร็จการศึกษาภายใน 4 ปี",
              data: normal,
            },
            {
              label: "ใช้เวลาเกิน 4 ปี",
              data: over,
            }
          ]
        }
      });

      this.avgChart = new Chart("avgChart", {
        type: "pie",
        data: {
          labels: [
            "สำเร็จการศึกษาก่อน 4 ปี",
            "สำเร็จการศึกษา 4 ปี",
            "สำเร็จการศึกษาเกิน 4 ปี",
            "ลาออก/ให้ออก/เสียชีวิต"
          ],
          datasets: [{
            data: [(sumEarly/n).toFixed(2),(sumNormal/n).toFixed(2),(sumOver/n).toFixed(2),(sumOther/n).toFixed(2)]
          }]
        },
        plugins: [ChartDataLabels],
        options: {
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                console.log(context);
                
                return  value
              }
            }
          }
        }        
      })

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: year,
          datasets: [
            {
              label: "สำเร็จการศึกษาก่อน 4 ปี",
              data: early,
            },
            {
              label: "สำเร็จการศึกษา 4 ปี",
              data: normal,
            },
            {
              label: "สำเร็จการศึกษาเกิน 4 ปี",
              data: over,
            },
            {
              label: "ลาออก/ให้ออก/เสียชีวิต",
              data: other,
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      })
    })

   
  }

  onLoading(){
    try {
      this.gs.getGraduated().subscribe(
        data => {
          this.gdata = data;
        },
          err => {
            console.log(err);
          })
    }catch (error) {
      console.log(error);
    }
  }

  openEdit(){
    this.edit = !this.edit
  }

  editAnalysis(){
    this.graduatedForm.value.editor = this.user;

    this.as.editAnalysis(this.graduatedAnalysis.index,this.token,this.graduatedForm.value)
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

  get text() {
    return this.graduatedForm.get('text');
  }


}
