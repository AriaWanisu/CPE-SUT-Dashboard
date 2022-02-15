import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentAmount: any;
  courseChart: any;
  yearChart: any;

  students: any;
  token: any;

  constructor(private studentService: StudentService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;
    console.log(this.token);
    
    this.studentService.getStudent(this.token).subscribe(
      (data) => {
        this.students = data;
        console.log(this.students);

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

        console.log(allTotal);
        console.log(year);
        console.log(total1);
        console.log(total2);

        this.studentAmount = new Chart("amount", {
          type: "line",
          data: {
            labels: year,
            datasets: [
              {
                label: "จำนวนนักศึกษาที่กำลังศึกษา",
                data: allTotal
              }
            ]
          }
        });

        this.courseChart = new Chart("courseChart", {
          type: "line",
          data: {
            labels: year,
            datasets: [
              { 
                label: "หลักสูตร วิศวกรรมคอมพิวเตอร์ 2554",
                data: total1
              },
              { 
                label: "หลักสูตร วิศวกรรมคอมพิวเตอร์ 2560",
                data: total2
              },
            ]
          }
        });
      
        this.yearChart = new Chart("yearChart", {
          type: "bar",
          data: {
            labels: year,
            datasets: [
              {
                label: "ชั้นปีที่ 1",
                data: allyear1
              },
              {
                label: "ชั้นปีที่ 2",
                data: allyear2
              },
              {
                label: "ชั้นปีที่ 3",
                data: allyear3
              },
              {
                label: "ชั้นปีที่ 4",
                data: allyear4
              },
              {
                label: "ชั้นปีที่ 5 เป็นต้นไป",
                data: allyear5
              },
            ]
          }
        })

      },
      (err) => {
        console.log("can't get students");
      }
    );

  }

}
