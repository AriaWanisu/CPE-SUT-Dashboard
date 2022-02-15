import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren} from '@angular/core';
import { DataService  } from 'src/app/services/data.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @ViewChild('canvas') canvas: ElementRef

  data: any;
  chart: any;
  manyChart: any;

  constructor(private dataser: DataService, private elementRef: ElementRef) { 
  }

  trackByFn(index:number){
    return (index);
  }

  ngAfterViewInit() {
    this.dataser.getData().subscribe(res => {
      this.data = res;
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
      });

      console.log(this.data);
      
      // this.data.forEach((element) => {
      //   console.log(element);
      //   this.manyChart = new Chart(element._id,{
      //     type: "pie",
      //         data: { 
      //           labels: ["thisRetire","thisEntrance"],
      //           datasets: [ { data: [element.retire, element.entrance] } ]
      //         },
              
      //   });
      // });

      for(let i = 0; i < this.data.length; i++){

        console.log("start of loop " + i);
  
        let thisRetire = this.data[i].retire;
        let thisEntrance = this.data[i].entrance;

        this.manyChart[i] = new Chart("chart"+i,{
            type: "pie",
                data: { 
                  labels: ["thisRetire","thisEntrance"],
                  datasets: [ { data: [thisRetire, thisEntrance] } ]
                },
        });
      
        console.log("end of loop " + i);
      }
    });
  }
      //   this.manyChart = new Chart("chart" + i,{
      //     type: "pie",
      //         data: { 
      //           labels: ["thisRetire","thisEntrance"],
      //           datasets: [ { data: [thisRetire, thisEntrance] } ]
      //         },
              
      //   }
      //   );
        
      //   console.log("end of loop " + i);
      // }

    // });

  drawChart(year: any, retire: Number, entrance: Number){
    return this.manyChart[year] = new Chart(year, { type: "pie", data: { labels: ["thisRetire","thisEntrance"], datasets: [ { data: [retire, entrance] } ]}}); 
  }

}
