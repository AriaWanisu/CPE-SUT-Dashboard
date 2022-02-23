import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'src/app/services/score.service';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';

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

  constructor(public local: LocalStorageService,private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

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

        for(var i = 0; i < this.score.length; i++){
          if(year[i-1] != year[i]){
            eachYear.push(year[i]);
          }
          if(institute[i] == "สาขาวิชาวิศวกรรมคอมพิวเตอร์"){
            comTerm1.push(term1[i]);
            comTerm2.push(term2[i]);
            comTerm3.push(term3[i]);
          } else if(institute[i] == "สำนักวิชาวิศวกรรมศาสตร์"){
            engTerm1.push(term1[i]);
            engTerm2.push(term2[i]);
            engTerm3.push(term3[i]);
          } else if(institute[i] == "มหาวิทยาลัย"){
            uniTerm1.push(term1[i]);
            uniTerm2.push(term2[i]);
            uniTerm3.push(term3[i]);
          }
        }

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

}
