import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service'
import { LocalStorageService } from 'angular-web-storage';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service'

@Component({
  selector: 'app-work-data',
  templateUrl: './work-data.component.html',
  styleUrls: ['./work-data.component.css']
})
export class WorkDataComponent implements OnInit {

  works: any;
  token: any;

  selectedYear: number;
  years: number[] = [];  

  isAdd: boolean = false;
  isEdit: boolean = false;
  warningAns: boolean = false;
  warningEarly: boolean = false;
  warningOverAns: boolean = false;
  warningPersent: boolean = false;
  warningOver100: boolean = false;
  warningNegative: boolean = false;

  total: any = 0;
  totalAns: any = 0;

  ans: any = 0;
  perAns: any = 0;

  oldWork: any = 0;
  work: any = 0;
  perWork: any = 0;

  oldStudy: any = 0;
  study: any = 0;
  perStudy: any = 0;

  oldNow: any = 0;
  not: any = 0;
  perNot: any = 0;

  oldEarly: any = 0;
  early: any = 0;
  perEarly: any = 0;

  avgSalary: any = 0;

  relevance: any = 0;

  workForm = new FormGroup({
    id: new FormControl(''),
    year: new FormControl([Validators.required]),
    total: new FormControl('',[Validators.required]),
    answer: new FormControl(0,[Validators.required]),
    percentAnswer: new FormControl(0,[Validators.required]),
    getWork: new FormControl(0,[Validators.required]),
    percentGetWork: new FormControl(0,[Validators.required]),
    study: new FormControl(0,[Validators.required]),
    pecrentStudy: new FormControl(0,[Validators.required]),
    notWork: new FormControl(0,[Validators.required]),
    percentNotWork: new FormControl(0,[Validators.required]),
    workEarly: new FormControl(0,[Validators.required]),
    percentWorkEarly: new FormControl(0,[Validators.required]),
    avgSalary: new FormControl(0,[Validators.required]),
    relevance: new FormControl(0,[Validators.required]),
  });


  constructor(private workService: WorkService, public local: LocalStorageService, private excelService:ExcelService) { 
    this.selectedYear = new Date().getFullYear() + 543
    ;
    for (let year = this.selectedYear-10; year <= this.selectedYear + 10; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.workService.getWork(this.token).subscribe(
      (res) => {
        this.works = res
      }
    )
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.works, 'work_data');
  }

  openAdd(){
    this.isAdd = !this.isAdd;
    this.isEdit = false;
    this.workForm.reset();
    this.total = 0;
    this.ans = 0;
    this.perAns = 0;
    this.study = 0;
    this.perStudy = 0;
    this.early = 0;
    this.perEarly = 0;
    this.not = 0;
    this.perNot = 0;
    this.avgSalary = 0;
    this.relevance = 0;
  }

  openEdit(data){
    this.isEdit = true;
    this.isAdd = false;
    this.workForm.patchValue({
      id:             data._id,
      year:           data.year,
      total:          data.total,
      answer:         data.answer,
      percentAnswer:  data.percentAnswer,
      getWork:        data.getWork,
      percentGetWork: data.percentGetWork,
      study:          data.study,
      pecrentStudy:   data.pecrentStudy,
      notWork:        data.notWork,
      percentNotWork: data.percentNotWork,
      workEarly:      data.workEarly,
      percentWorkEarly: data.percentWorkEarly,
      avgSalary:        data.avgSalary,
      relevance:        data.relevance,

    });
    this.total = parseInt(data.total)
    this.ans = parseInt(data.answer);
    this.work = parseInt(data.getWork);
    this.perWork = parseInt(data.percentGetWork);
    this.perAns = parseInt(data.percentAnswer);
    this.study = parseInt(data.study)
    this.perStudy = parseInt(data.pecrentStudy);
    this.early = parseInt(data.workEarly);
    this.perEarly = parseInt(data.percentWorkEarly);
    this.study = parseInt(data.study)
    this.not = parseInt(data.notWork);
    this.perNot = parseInt(data.percentNotWork);
    this.avgSalary = parseInt(data.avgSalary);
    this.relevance = parseInt(data.relevance);
  }

  addData(){
    this.workService.addWork(this.workForm.value , this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },
      err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      });
  }

  updateWork(){
    this.workService.updateWork(this.workForm.value.id,this.workForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteWork(item){
    this.workService.deleteWork(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }

  addTotal(n){
    this.total = parseInt(n.target.value);
    if(this.total < 0){
      this.warningNegative  = true;
    } else {
      this.warningNegative  = false;
      if(this.ans != 0 && this.ans <= this.total){
        this.warningAns = false;
        this.perAns = ((this.ans * 100)/this.total).toFixed(2);
        this.workForm.patchValue({ percentAnswer: this.perAns});
      }
      this.workForm.patchValue({ total: this.total});
    }
  }

  addAns(n){
    console.log(this.work);
    
    this.ans = parseInt(n.target.value);
    if(this.ans < 0){
      this.warningNegative  = true;
    } else { 
      if(this.ans > this.total){
        this.warningAns = true;
      }
      else { 
        this.perAns = ((this.ans * 100)/this.total).toFixed(2);
        this.workForm.patchValue({ percentAnswer: this.perAns});
        this.warningAns = false;
        if(this.work != 0){
          this.perWork = ((this.work * 100)/this.ans).toFixed(2);
          this.workForm.patchValue({ percentGetWork: this.perWork});
        }
        if(this.study != 0){
          this.perStudy = ((this.study * 100)/this.ans).toFixed(2);
          this.workForm.patchValue({ pecrentStudy: this.perStudy});
        }
        if(this.not != 0){
          this.perNot = ((this.not * 100)/this.ans).toFixed(2);
          this.workForm.patchValue({ percentNotWork: this.perNot});
        }
      }
      if(this.work + this.study + this.not != this.ans){
        this.warningOverAns = true;
      }
      else { 
        this.warningOverAns = false;
      }
    }
  }

  addWork(n){
    this.work = parseInt(n.target.value);
    if(this.work < 0){
      this.warningNegative  = true;
    } else { 
      this.perWork = ((this.work * 100)/this.ans).toFixed(2);
      this.workForm.patchValue({ percentGetWork: this.perWork});
      if(this.work + this.study + this.not != this.ans){
        this.warningOverAns = true;
      }
      else { 
        this.warningOverAns = false;
      }
      if(this.early != 0){
        this.perEarly = ((this.early * 100)/this.work).toFixed(2);
        this.workForm.patchValue({ percentWorkEarly: this.perEarly});
        this.warningEarly = false;
      }
    }
  }

  addStudy(n){
    this.study = parseInt(n.target.value);
    if(this.study < 0){
      this.warningNegative  = true;
    } else { 
      this.perStudy = ((this.study * 100)/this.ans).toFixed(2);
      this.workForm.patchValue({ pecrentStudy: this.perStudy});
      if(this.work + this.study + this.not != this.ans){
        this.warningOverAns = true;
      }
      else { 
        this.warningOverAns = false;
      }
    }
  }

  addNot(n){
    this.not = parseInt(n.target.value);
    if(this.not < 0){
      this.warningNegative  = true;
    } else {
      this.perNot = ((this.not * 100)/this.ans).toFixed(2);
      this.workForm.patchValue({ percentNotWork: this.perNot});
      if(this.work + this.study + this.not != this.ans){
        this.warningOverAns = true;
      }
      else { 
        this.warningOverAns = false;
      }
     }
  }

  addEarly(n){
    this.early = parseInt(n.target.value);
    if(this.early < 0){
      this.warningNegative  = true;
    } else { 
      this.perEarly = ((this.early * 100)/this.work).toFixed(2);
      this.workForm.patchValue({ percentWorkEarly: this.perEarly});
      if(this.early > this.work){
        this.warningEarly = true;
      }
      else {
        this.warningEarly = false;
        if(this.perEarly > 100 || this.perEarly < 0){
          this.warningPersent = true;
        }
        else { 
          this.warningPersent = false;
        }
      }
      console.log(this.workForm.value); }
  }

  addRelavance(n){
    this.relevance = parseInt(n.target.value);
    if(this.relevance < 0){
      this.warningNegative  = true;
    } else { 
      if(this.relevance > 100 || this.relevance < 0){
        this.warningPersent = true;
      } else {
        this.warningPersent = false;
      }
    }
  }

}
