import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AnalysisService } from 'src/app/services/analysis.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  score: any;
  token: any

  comChart: any;
  engChart: any;
  uniChart: any;
  avgChart: any;

  config: any;
  isAdmin: boolean = false;
  edit: boolean = false;

  analysis: any;
  writer: any;
  user: any;

  AnalysisForm = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });

  constructor(public local: LocalStorageService,private scoreService: ScoreService,private as: AnalysisService,private us: UserService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;
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

    this.as.getAnalysis("score",this.token).subscribe(
      (res) => {
        this.analysis = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writer = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
        console.log(this.writer);
      }
    );

    this.config = {
      placeholder: '',
      tabsize: 2,
      height: '200px',
      toolbar: [
          ['misc', ['codeview', 'undo', 'redo']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['para', ['style', 'ul', 'ol']],
          ['insert', ['table', 'hr']]
      ],
    }

    this.scoreService.getScore(this.token).subscribe(
      (res) => {
        this.score = res;
        
        let year = res.map(res => res.year);
        let institute= res.map(res => res.institute);
        let term1 = res.map(res => res.term1);
        let term2 = res.map(res => res.term2);
        let term3 = res.map(res => res.term3);

        let comTerm1 = [];
        let comTerm2 = [];
        let comTerm3 = [];
        let engTerm1 = [];
        let engTerm2 = [];
        let engTerm3 = [];
        let uniTerm1 = [];
        let uniTerm2 = [];
        let uniTerm3 = [];
        let eachYear = [];
        let avgCom = [];
        let avgEng = [];
        let avgUni = [];

        for(var i = 0; i < this.score.length; i++){
          if(year[i-1] != year[i]){
            eachYear.push(year[i]);
          }
          if(institute[i] == "สาขาวิชาวิศวกรรมคอมพิวเตอร์"){
            comTerm1.push(term1[i]);
            comTerm2.push(term2[i]);
            comTerm3.push(term3[i]);
            console.log(term1[i]+term2[i]+term3[i]);
            let sum = (term1[i])+(term2[i])+(term3[i]);
            avgCom.push((sum/3).toFixed(2));
            console.log(avgCom);
          } else if(institute[i] == "สำนักวิชาวิศวกรรมศาสตร์"){
            engTerm1.push(term1[i]);
            engTerm2.push(term2[i]);
            engTerm3.push(term3[i]);
            let sum = (term1[i])+(term2[i])+(term3[i]);
            avgEng.push((sum/3).toFixed(2));
          } else if(institute[i] == "มหาวิทยาลัย"){
            uniTerm1.push(term1[i]);
            uniTerm2.push(term2[i]);
            uniTerm3.push(term3[i]);
            let sum = (term1[i])+(term2[i])+(term3[i]);
            avgUni.push((sum/3).toFixed(2));
          }
        }

        this.avgChart = new Chart("avg", {
          type: 'line',
          data: {
            labels: eachYear,
            datasets: [
              {
                label: 'ผลการประเมิณเฉลี่ยสาขาวิศวกรรมคอมพิวเตอร์',
                data: avgCom
              },
              {
                label: 'ผลการประเมิณเฉลี่ยสำนักวิชาวิศวกรรมศาสตร์',
                data: avgEng
              },
              {
                label: 'ผลการประเมิณเฉลี่ยมหาวิทยาลัย',
                data: avgUni
              }
            ]
          }
        })

        // comChart
        this.comChart = new Chart("com", {
          type: "bar",
          data: {
            labels: eachYear,
            datasets: [
              {
                label: "ผลประเมินการสอนเทอม 1",
                data: comTerm1
              },
              {
                label: "ผลประเมินการสอนเทอม 2",
                data: comTerm2
              },
              {
                label: "ผลประเมินการสอนเทอม 3",
                data: comTerm3
              },
            ]
          }
        });
        // end comChart

        // engChart
        this.engChart = new Chart("eng", {
          type: "bar",
          data: {
            labels: eachYear,
            datasets: [
              {
                label: "ผลประเมินการสอนเทอม 1",
                data: engTerm1
              },
              {
                label: "ผลประเมินการสอนเทอม 2",
                data: engTerm2
              },
              {
                label: "ผลประเมินการสอนเทอม 3",
                data: engTerm3
              },
            ]
          }
        });
        // end engChart

       // uniChart
       this.uniChart = new Chart("uni", {
        type: "bar",
        data: {
          labels: eachYear,
          datasets: [
            {
              label: "ผลประเมินการสอนเทอม 1",
              data: uniTerm1
            },
            {
              label: "ผลประเมินการสอนเทอม 2",
              data: uniTerm2
            },
            {
              label: "ผลประเมินการสอนเทอม 3",
              data: uniTerm3
            },
          ]
        }
      });
      // end uniChart

      }
    )
  }

  openEdit(){
    this.edit = true;
  }

  editAnalysis(){
    this.AnalysisForm.value.editor = this.user;

    this.as.editAnalysis(this.analysis.index,this.token,this.AnalysisForm.value)
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
    return this.AnalysisForm.get('text');
  }

}
