import { Component, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  data: any;
  retire: string;
  r: any = [];

  ngAfterViewInit(): void {
    this.getData();
    const script = document.createElement('script');
    script.src = '../../../assets/js/chart.js';
    document.body.appendChild(script);

    script.setAttribute("id", "chart");
    script.setAttribute("data-dummy-json", this.retire);
  }

  constructor(private dataser: DataService) {
    console.log(this.data);
  }

  getData() {
    this.dataser.getData().subscribe(
      (data) => {
        this.data = data;
        this.retire = "[";
        for (let i = 0; i < data.length; i++) {
          if (i != data.length - 1) {
            this.retire += data[i].retire + ",";
          } else {
            this.retire += data[i].retire + "]";
          }
        }
        console.log(this.retire);
      }
    )
  }
}
