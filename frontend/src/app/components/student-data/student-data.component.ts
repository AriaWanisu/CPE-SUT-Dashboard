import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { AnalysisService } from 'src/app/services/analysis.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { ExcelService } from 'src/app/services/excel.service'
import { PdfService } from 'src/app/services/pdf.service'

declare var $:any;

@Component({
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {

  students: any;
  token: any;

  warning1: boolean = false;
  warning2: boolean = false;
  warning3: boolean = false;
  warning4: boolean = false;
  warning5: boolean = false;
  
  isAdd: boolean = false;
  isEdit: boolean = false;
  total: any = 0;
  year1: any = 0;
  year2: any = 0;
  year3: any = 0;
  year4: any = 0;
  year5up: any = 0;

  StudentForm = new FormGroup({
    id: new FormControl(''),
    term: new FormControl('',[Validators.required]),
    course: new FormControl('',[Validators.required]),
    year1: new FormControl(0,[Validators.required]),
    year2: new FormControl(0,[Validators.required]),
    year3: new FormControl(0,[Validators.required]),
    year4: new FormControl(0,[Validators.required]),
    year5up: new FormControl(0,[Validators.required]),
    total: new FormControl(0,[Validators.required]),
  });


  constructor(private studentService: StudentService,public local: LocalStorageService, private excelService:ExcelService, private PdfService:PdfService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.studentService.getStudent(this.token).subscribe(
      (res) => {
        this.students = res
      }
    )
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.students, 'students_data');
  }

  openAdd(){
    console.log(this.StudentForm.value);
    
    this.isAdd = !this.isAdd;
    this.isEdit = false;
    this.StudentForm.reset();
    this.year1 = 0;
    this.year2 = 0;
    this.year3 = 0;
    this.year4 = 0;
    this.year5up = 0;
  }

  openEdit(data){
    this.isEdit = true;
    this.isAdd = false;
    this.StudentForm.patchValue({
      id: data._id,
      term: data.term,
      course: data.course,
      year1: data.year1,
      year2: data.year2,
      year3: data.year3,
      year4: data.year4,
      year5up: data.year5up,
      total: data.total
    });
    this.year1 = parseInt(data.year1);
    this.year2 = parseInt(data.year2);
    this.year3 = parseInt(data.year3);
    this.year4 = parseInt(data.year4);
    this.year5up = parseInt(data.year5up);
    this.total = parseInt(data.total)
  }

  addTotal1(n){
    let old = this.year1;
    let num = parseInt(n.target.value);
    console.log("old = " + old);
    console.log("num = " + num);
    console.log("total = " + this.total);
    this.total = this.total - old + num ;
    this.year1 = num;
    this.StudentForm.patchValue({ total: this.total});
    console.log(this.StudentForm.value.total);
    if(this.year1 < 0){
      this.warning1 = true;
    } else {
      this.warning1 = false;
    }
  }

  addTotal2(n){
    let old = this.year2;
    let num = parseInt(n.target.value);
    this.total = this.total - old + num ;
    this.year2 = num;
    this.StudentForm.patchValue({ total: this.total});
    if(this.year2 < 0){
      this.warning2 = true;
    } else {
      this.warning2 = false;
    }
  }

  addTotal3(n){
    let old = this.year3;
    let num = parseInt(n.target.value);
    this.total = this.total - old + num ;
    this.year3 = num;
    this.StudentForm.patchValue({ total: this.total});
    if(this.year3 < 0){
      this.warning3 = true;
    } else {
      this.warning3 = false;
    }
  }

  addTotal4(n){
    let old = this.year4;
    let num = parseInt(n.target.value);
    console.log("old = " + old);
    console.log("num = " + num);
    console.log("total = " + this.total);
    this.total = this.total - old + num ;
    this.year4 = num;
    this.StudentForm.patchValue({ total: this.total});
    console.log(this.StudentForm.value.total);
    if(this.year4 < 0){
      this.warning4 = true;
    } else {
      this.warning4 = false;
    }
  }

  addTotal5(n){
    let old = this.year5up;
    let num = parseInt(n.target.value);
    console.log("old = " + old);
    console.log("num = " + num);
    console.log("total = " + this.total);
    this.total = this.total - old + num ;
    this.year5up = num;
    this.StudentForm.patchValue({ total: this.total});
    console.log(this.StudentForm.value.total);
    if(this.year5up < 0){
      this.warning5 = true;
    } else {
      this.warning5 = false;
    }
  }


  addData(){
    this.studentService.addStudent(this.StudentForm.value , this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },
      err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      });
  }

  updateStudent(){
    this.studentService.updateStudent(this.StudentForm.value.id,this.StudentForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteStudent(item){
    this.studentService.deleteStudent(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }
}
