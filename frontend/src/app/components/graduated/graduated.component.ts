import { Component, OnInit } from '@angular/core';
import { GraduetedService  } from 'src/app/services/gradueted.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graduated',
  templateUrl: './graduated.component.html',
  styleUrls: ['./graduated.component.css']
})
export class GraduatedComponent implements OnInit {

  gdata: any;
  avgChart: any;
  compareChart: any;
  anyChart: any;
  chart: any;
  avg: any;

  constructor(private gs: GraduetedService) {
      this.onLoading();
      console.log(this.gdata);
   }

  ngOnInit(): void {
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
            data: [sumEarly/n,sumNormal/n,sumOver/n,sumOther/n]
          }]
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

}
