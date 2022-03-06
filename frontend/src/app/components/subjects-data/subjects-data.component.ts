import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { SubjectService } from 'src/app/services/subject.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service'

@Component({
  selector: 'app-subjects-data',
  templateUrl: './subjects-data.component.html',
  styleUrls: ['./subjects-data.component.css']
})
export class SubjectsDataComponent implements OnInit {

  subjects: any;
  subjectList: any;
  subjectTable: any;
  token: any;

  table: boolean = false;

  //check logic
  add: boolean = false;
  edit: boolean = false;

  a: any;
  b_plus: any;
  b: any;
  c_plus: any;
  c: any;
  d_plus: any;
  d: any;
  f: any;
  p: any;
  s: any;
  u: any;
  total: any;

  //validetor
  warningA: boolean = false;
  warningB2: boolean = false;
  warningB: boolean = false;
  warningC2: boolean = false;
  warningC: boolean = false;
  warningD2: boolean = false;
  warningD: boolean = false;
  warningF: boolean = false;
  warningS: boolean = false;
  warningP: boolean = false;
  warningU: boolean = false;
  warningtotal: boolean = false;
  warningAVG: boolean = false;
  warningSTDEV: boolean = false;

  //get year
  selectedYear: number;
  years: number[] = [];  

  terms: number[] = [1, 2, 3]

  targetSubject = new FormGroup({
    subject: new FormControl('เลือกวิชา')
  })

  subjectForm = new FormGroup({
    id: new FormControl(''),
    year: new FormControl('',[Validators.required]),
    term: new FormControl('',[Validators.required]),
    subject: new FormControl('',[Validators.required]),
    a: new FormControl('',[Validators.required]),
    b_plus: new FormControl('',[Validators.required]),
    b: new FormControl('',[Validators.required]),
    c_plus: new FormControl('',[Validators.required]),
    c: new FormControl('',[Validators.required]),
    d_plus: new FormControl('',[Validators.required]),
    d: new FormControl('',[Validators.required]),
    f: new FormControl('',[Validators.required]),
    p: new FormControl('',[Validators.required]),
    s: new FormControl('',[Validators.required]),
    u: new FormControl('',[Validators.required]),
    total: new FormControl('',[Validators.required]),
    avg_gpa: new FormControl('',[Validators.required]),
    stdev: new FormControl('',[Validators.required]),
  });

  constructor(public local: LocalStorageService, private excelService:ExcelService, private subjectService: SubjectService) {
      this.selectedYear = new Date().getFullYear() + 543
      ;
      for (let year = this.selectedYear-5; year <= this.selectedYear + 5; year++) {
        this.years.push(year);
      }
   }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.subjectService.getSubject(this.token).subscribe(
      (res) => {
        this.subjects = res

        let subject = res.map(res => res.subject);
        let allSubject = [];
    
        allSubject.push(subject[0]);
        
        for(var i = 1; i < this.subjects.length; i++){
          let check = 0;
          for(var j = 0; j < allSubject.length; j++){
            if(subject[i] == allSubject[j]){
              check = 1;
            }
          }
          if(check == 0){
            allSubject.push(subject[i]);
          }
        }
        //end loop

        this.subjectList = allSubject;
        console.log(this.subjectList);
      }
    );

  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.subjectTable, this.targetSubject.value.subject + '-data');
  }

  exportAllAsXLSX():void {
    this.excelService.exportAsExcelFile(this.subjects, 'subject-data');
  }

  selectSubject(sub){
    this.table = true;
    this.subjectService.getListSubject(this.targetSubject.value,this.token).subscribe(
      (res) => {
        this.subjectTable = res;
        console.log(res);
        
      }
    )
  }

  openAdd(){
    this.add = !this.add;
    this.edit = false;
    this.subjectForm.reset();
    this.subjectForm.patchValue({ subject: this.targetSubject.value.subject});
    this.a = 0;
    this.b_plus = 0;
    this.b = 0;
    this.c_plus = 0;
    this.c = 0;
    this.d_plus = 0;
    this.d = 0;
    this.f = 0;
    this.s = 0;
    this.p = 0;
    this.u = 0;
    this.total = 0;
  }

  openEdit(item){
    this.edit = true;
    this.add = false;
    this.subjectForm.patchValue({
      id: item._id,
      year: item.year,
      term: item.term,
      subject: this.targetSubject.value.subject,
      a: item.a,
      b_plus: item.b_plus,
      b: item.b,
      c_plus: item.c_plus,
      c: item.c,
      d_plus: item.d_plus,
      d: item.d,
      f: item.f,
      p: item.p,
      s: item.s,
      u: item.u,
      total: item.total,
      avg_gpa: item.avg_gpa,
      stdev: item.stdev,
    })
    this.a = item.a;
    this.b_plus = item.b_plus;
    this.b = item.b;
    this.c_plus = item.c_plus;
    this.c = item.c;
    this.d_plus = item.d_plus;
    this.d = item.d;
    this.f = item.f;
    this.s = item.s;
    this.p = item.p;
    this.u = item.u;
    this.total = item.total;
  }

  addSubject(){
    this.subjectService.addSubject(this.subjectForm.value, this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      }
    )
  }

  updateSubject(){
    this.subjectService.updateSubject(this.subjectForm.value.id,this.subjectForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteScore(item){
    this.subjectService.deleteSubject(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }

  addA(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.a + num;
    this.a = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningA = true;
    } else {
      this.warningA = false;
    }
  }

  addB2(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.b_plus + num;
    this.b_plus = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningB2 = true;
    } else {
      this.warningB2 = false;
    }
  }

  addB(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.b + num;
    this.b = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningB = true;
    } else {
      this.warningB = false;
    }
  }

  addC2(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.c_plus + num;
    this.c_plus = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningC2 = true;
    } else {
      this.warningC2 = false;
    }
  }

  addC(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.c + num;
    this.c = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningC = true;
    } else {
      this.warningC = false;
    }
  }

  addD2(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.d_plus + num;
    this.d_plus = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningD2 = true;
    } else {
      this.warningD2 = false;
    }
  }

  addD(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.d + num;
    this.d = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningD = true;
    } else {
      this.warningD = false;
    }
  }

  addF(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.f + num;
    this.f = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningF = true;
    } else {
      this.warningF = false;
    }
  }

  addP(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.p + num;
    this.p = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningP = true;
    } else {
      this.warningP = false;
    }
  }

  addS(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.s + num;
    this.s = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningS = true;
    } else {
      this.warningS = false;
    }
  }

  addU(n){
    let num = parseInt(n.target.value);
    this.total = this.total - this.u + num;
    this.u = num;
    this.subjectForm.patchValue({total: this.total});
    if(num < 0){
      this.warningU = true;
    } else {
      this.warningU = false;
    }
  }

  addAvg(n){
    let num = parseInt(n.target.value);
    if(num < 0){
      this.warningAVG = true;
    } else {
      this.warningAVG = false;
    }
  }

  addSTDEV(n){
    let num = parseInt(n.target.value);
    if(num < 0){
      this.warningSTDEV = true;
    } else {
      this.warningSTDEV = false;
    }
  }

}
