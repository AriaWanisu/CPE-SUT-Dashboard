import { Component, OnInit } from '@angular/core';
import { DataService  } from 'src/app/services/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  data: any;
  chart: any;

  constructor(private dataser: DataService) { }

  ngOnInit() {
    this.dataser.getData().subscribe(res => {
      let retire = res.map(res => res.retire);
      let entrance = res.map(res => res.entrance);
      let year = res.map(res => res.year);
      
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: year,
          datasets: [
            {
              label: "Amoung of retire",
              data: retire,
            },
            {
              label: "Amoung of entrance",
              data: entrance,
            },
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

}
