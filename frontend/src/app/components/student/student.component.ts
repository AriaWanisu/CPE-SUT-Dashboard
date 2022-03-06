import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import { AnalysisService } from 'src/app/services/analysis.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentAmount: any;
  courseChart: any;
  yearChart: any;
  diffChart: any;

  config: any;
  total: any;
  thisyear: any;
  male: any;
  female: any;
  gender: any;
  edit: boolean = false;
  edit2: boolean = false;
  isAdmin: boolean = false;

  students: any;
  writer: any;
  writer2: any;
  user: any;

  analysis1: any;
  analysis2: any;

  oldChart: any;
  newChart: any;

  ex: any;

  token: any;

  Analysis1Form = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });

  Analysis2Form = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });

  constructor(private sanitizer: DomSanitizer, private studentService: StudentService,public local: LocalStorageService,private as: AnalysisService,private us: UserService) { }

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
    
    this.as.getAnalysis("student1",this.token).subscribe(
      (res) => {
        this.analysis1 = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writer = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
      }
    );

    this.as.getAnalysis("student2",this.token).subscribe(
      (res) => {
        this.analysis2 = res;
        this.us.getUserById(res.editor).subscribe(
          (data) => {
            this.writer2 = data;
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

    this.studentService.getStudentGender(this.token).subscribe(
      (res) => {

        this.gender = res;

        let term = res.map(res => res.term);
        let male = res.map(res => res.male);
        let female = res.map(res => res.female);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.male = male[i-1]+male[i];
            this.female = female[i-1]+female[i];
          }
        }
      });

    this.studentService.getStudent(this.token).subscribe(
      (data) => {
        this.students = data;

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
        let oldyear1 = [];
        let oldyear2 = [];
        let oldyear3 = [];
        let oldyear4 = [];
        let oldyear5 = [];
        let newyear1 = [];
        let newyear2 = [];
        let newyear3 = [];
        let newyear4 = [];
        let newyear5 = [];
        
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
            oldyear1.push(year1[i]);
            oldyear2.push(year2[i]);
            oldyear3.push(year3[i]);
            oldyear4.push(year4[i]);
            oldyear5.push(year5up[i]);
          }
          else if(this.students[i].course == "วิศวกรรมคอมพิวเตอร์-2560"){
            total2.push(total[i]);
            newyear1.push(year1[i]);
            newyear2.push(year2[i]);
            newyear3.push(year3[i]);
            newyear4.push(year4[i]);
            newyear5.push(year5up[i]);
          }
        }

        this.total = allTotal[allTotal.length-1]
        this.thisyear = year[year.length-1]

        this.oldChart = new Chart('old', {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'ปี 1',
                data: oldyear1,
              },
              {
                label: 'ปี 2',
                data: oldyear2,
              },
              {
                label: 'ปี 3',
                data: oldyear3,
              },
              {
                label: 'ปี 4',
                data: oldyear4,
                backgroundColor: 'rgba(130, 25, 192, 0.5)',
              },
              {
                label: 'ปี 5 ขึ้นไ',
                data: oldyear5,
              }
            ]
          },
          
        })

        this.newChart = new Chart('new', {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'ปี 1',
                data: newyear1
              },
              {
                label: 'ปี 2',
                data: newyear2
              },
              {
                label: 'ปี 3',
                data: newyear3
              },
              {
                label: 'ปี 4',
                data: newyear4,
                backgroundColor: 'rgba(130, 25, 192, 0.5)',
              },
              {
                label: 'ปี 5 ขึ้นไป',
                data: newyear5
              },
            ]
          }
        })

        this.studentAmount = new Chart("amount", {
          type: "line",
          data: {
            labels: year,
            datasets: [
              {
                label: "จำนวนนักศึกษาที่กำลังศึกษา",
                data: allTotal,
                fill: true,
                tension: 0.4,
                order: 2
              },
              { 
                label: "หลักสูตร วิศวกรรมคอมพิวเตอร์ 2554",
                fill: true,
                data: total1,
                tension: 0.4,
                order: 0,
              },
              { 
                label: "หลักสูตร วิศวกรรมคอมพิวเตอร์ 2560",
                fill: true,
                data: total2,
                tension: 0.4,
                order: 1
              },
            ]
          },
          options: {
            plugins: {
              filler: {
                propagate: true
              }
            }
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
      
      
      },
      (err) => {
        console.log("can't get students");
      }
    );

  }

  openEdit1(){
    this.edit = !this.edit;
  }

  openEdit2(){
    this.edit2 = !this.edit2;
  }

  editAnalysis1(){
    this.Analysis1Form.value.editor = this.user;

    console.log(this.Analysis1Form.value);

    this.as.editAnalysis(this.analysis1.index,this.token,this.Analysis1Form.value)
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

  editAnalysis2(){
    this.Analysis2Form.value.editor = this.user;

    console.log(this.Analysis2Form.value);

    this.as.editAnalysis(this.analysis2.index,this.token,this.Analysis2Form.value)
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
    return this.Analysis1Form.get('text');
  }

  get text2() {
    return this.Analysis2Form.get('text');
  }

}
