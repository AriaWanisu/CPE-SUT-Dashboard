import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { ExcelService } from 'src/app/services/excel.service'


@Component({
  selector: 'app-gender-data',
  templateUrl: './gender-data.component.html',
  styleUrls: ['./gender-data.component.css']
})
export class GenderDataComponent implements OnInit {

  genders: any;
  token: any;
  
  isAdd: boolean = false;
  isEdit: boolean = false;
  total: any = 0;
  male: any = 0;
  female: any = 0;

  genderForm = new FormGroup({
    id: new FormControl(''),
    term: new FormControl('',[Validators.required]),
    course: new FormControl('',[Validators.required]),
    male: new FormControl(0,[Validators.required]),
    female: new FormControl(0,[Validators.required]),
    total: new FormControl(0,[Validators.required]),
  });

  constructor(private studentService: StudentService,public local: LocalStorageService, private excelService:ExcelService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.studentService.getStudentGender(this.token).subscribe(
      (res) => {
        this.genders = res
      }
    )
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.genders, 'students_gender_data');
  }

  openAdd(){
    this.isAdd = !this.isAdd;
    this.isEdit = false;
    this.genderForm.reset();
    this.male = 0;
    this.female = 0;
  }

  openEdit(data){
    this.isEdit = true;
    this.isAdd = false;
    this.genderForm.patchValue({
      id: data._id,
      term: data.term,
      course: data.course,
      male: data.male,
      female: data.female,
      total: data.total
    });
    this.male = parseInt(data.male);
    this.female = parseInt(data.female);
    this.total = parseInt(data.total)
  }

  addTotalMale(n){
    let old = this.male;
    let num = parseInt(n.target.value);
    this.total = this.total - old + num ;
    this.male = num;
    this.genderForm.patchValue({ total: this.total});
  }

  addTotalFemale(n){
    let old = this.female;
    let num = parseInt(n.target.value);
    this.total = this.total - old + num ;
    this.female = num;
    this.genderForm.patchValue({ total: this.total});
  }

  addData(){
    this.studentService.addGender(this.genderForm.value , this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },
      err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      });
  }

  updateGender(){
    this.studentService.updateGender(this.genderForm.value.id,this.genderForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteGender(item){
    this.studentService.deleteGender(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }

}
