import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service';  
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';

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

  constructor(private workService: WorkService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

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
                backgroundColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)'
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
              legend: {
                position: "top"
              }
            }
          }
        });

    });

  }

}
