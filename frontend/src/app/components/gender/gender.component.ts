import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { LocalStorageService } from 'angular-web-storage';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AnalysisService } from 'src/app/services/analysis.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  //chart part
  gender: any;
  token: any;
  genderChart: any;
  pieChart: any;
  thisMale: any;
  thisFemale: any;
  oldChart: any;
  newChart: any;
  courseChart: any;

  //analysis part
  genderAnalysis: any;
  writter: any;
  user: any;

  //check logic
  isAdmin: boolean = false;
  edit: boolean = false;

  //sumernote
  config: any;

  genderForm = new FormGroup({
    text: new FormControl('',[Validators.required]),
    editor: new FormControl('',[Validators.required]),
  });
  

  constructor(private studentServices: StudentService,public local: LocalStorageService, private analysisService: AnalysisService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;
    //check role
    if(this.local.get('user').result.role == "Admin"){
      this.isAdmin = true;
    }

    this.userService.getUser().subscribe(
      (data) => {
        this.user = data._id;
      },
      (err) => {
        console.log("can't get user");
      }
    )

    this.analysisService.getAnalysis("gender",this.token).subscribe(
      (res) => {
        this.genderAnalysis = res;
        this.userService.getUserById(res.editor).subscribe(
          (data) => {
            this.writter = data;
          },
          (err) => {
            console.log("can't get writter");
          }
        );  
      }
    )

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

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        this.gender = res;
        console.log(this.gender);
        
        let term = res.map(res => res.term);
        let course = res.map(res => res.course);
        let male = res.map(res => res.male);
        let female = res.map(res => res.female);
        let total = res.map(res => res.total);

        let year = [];
        let totalM = [];
        let totalF = [];
        let oldMale = [];
        let oldFemale = [];
        let newMale = [];
        let newFemale = [];

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            year.push(term[i]);
            totalM.push(male[i-1]+male[i]);
            totalF.push(female[i-1]+female[i])
          }
          if(course[i] == "วิศวกรรมคอมพิวเตอร์-2554"){
            oldMale.push(male[i]);
            oldFemale.push(female[i]);
          } else if(course[i] == "วิศวกรรมคอมพิวเตอร์-2560"){
            newMale.push(male[i]);
            newFemale.push(female[i]);
          }
        }

        console.log(oldMale);
        
        this.pieChart = new Chart('pieChart',{
          type: 'doughnut',
          data: {
            labels: ["นักศึกษาชาย","นักศึกษาหญิง"],
            datasets: [{
              data: [totalM[totalM.length-1],totalF[totalF.length-1]]
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

        this.genderChart = new Chart("genderChart", {
          type: 'bar',
          data: {
            labels: year,
            datasets: [
              {
                label: 'นักศึกษาชาย',
                data: totalM,
                order: 1
              },
              {
                label: "นักศึกษาหญิง",
                data: totalF,
                order: 1
              },
            ]
          }
        })

        this.courseChart = new Chart("courseChart", {
          type: "bar",
          data: {
            labels: year,
            datasets: [
              {
                label: 'นักศึกษาชายหลักสูตร 2554',
                data: oldMale,
                stack: 'stack 0'
              },
              {
                label: 'นักศึกษาหญิงหลักสูตร 2554',
                data: oldFemale,
                stack: 'stack 0',
              },
              {
                label: "นักศึกษาชายหลักสูตร 2560",
                data: newMale,
                stack: 'stack 1'
              },
              {
                label: 'นักศึกษาหญิงหลักสูตร 2560',
                data: newFemale,
                stack: 'stack 1',
                backgroundColor: 'rgba(100, 10, 130,0.5)',
              }
            ]
          },
          plugins: [ChartDataLabels],
          options: {
            plugins: {
              datalabels: {
                formatter: (value) => {
                  return  value
                }
              }
            }
          }        
        })

      }
    );
  }

  getMale(){
    this.token = this.local.get('user').token;

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        let term = res.map(res => res.term);
        let male = res.map(res => res.male);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.thisMale = male[i-1]+male[i];
          }
        }
      });

      return this.thisMale
  }

  getFemale(){
    this.token = this.local.get('user').token;

    this.studentServices.getStudentGender(this.token).subscribe(
      (res) => {
        let term = res.map(res => res.term);
        let female = res.map(res => res.female);

        for(var i = 0; i < this.gender.length; i++){
          if(term[i-1] == term[i]){
            this.thisFemale = female[i-1]+female[i];
          }
        }
      });

      return this.thisFemale
  }

  openEdit(){
    this.edit = !this.edit
  }

  editAnalysis(){
    this.genderForm.value.editor = this.user;

    this.analysisService.editAnalysis(this.genderAnalysis.index,this.token,this.genderForm.value)
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
    return this.genderAnalysis.get('text');
  }


}
