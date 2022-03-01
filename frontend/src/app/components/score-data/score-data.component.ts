import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { ExcelService } from 'src/app/services/excel.service'
import { ScoreService } from 'src/app/services/score.service';

@Component({
  selector: 'app-score-data',
  templateUrl: './score-data.component.html',
  styleUrls: ['./score-data.component.css']
})
export class ScoreDataComponent implements OnInit {

  scoreList: any;
  token: any;

  //check logic
  add: boolean = false;
  edit: boolean = false;

  //get year
  selectedYear: number;
  years: number[] = [];  

  institute: string[] = ['สาขาวิชาวิศวกรรมคอมพิวเตอร์', 'สำนักวิชาวิศวกรรมศาสตร์', 'มหาวิทยาลัย']

  //cal avg
  term1: any;
  term2: any;
  term3: any;
  avg: any;

  //validator
  warningTerm1: boolean = false;
  warningTerm2: boolean = false;
  warningTerm3: boolean = false;

  scoreForm = new FormGroup({
    id: new FormControl(''),
    year: new FormControl('',[Validators.required]),
    institute: new FormControl('',[Validators.required]),
    term1: new FormControl('',[Validators.required]),
    term2: new FormControl('',[Validators.required]),
    term3: new FormControl('',[Validators.required]),
    avg: new FormControl('',[Validators.required]),
  });

  constructor(public local: LocalStorageService, private excelService:ExcelService, private scoreService: ScoreService) { 
    this.selectedYear = new Date().getFullYear() + 543
    ;
    for (let year = this.selectedYear-7; year <= this.selectedYear + 5; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.scoreService.getScore(this.token).subscribe(
      (res) => {
        this.scoreList = res
      }
    )
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.scoreList, 'score-data');
  }

  openAdd(){
    this.add = !this.add;
    this.edit = false;
    this.scoreForm.reset();
    this.term1 = 0;
    this.term2 = 0;
    this.term3 = 0;
    this.avg = 0;
  }

  openEdit(item){
    this.edit = true;
    this.add = false;
    this.scoreForm.patchValue({
      id: item._id,
      year: item.year,
      institute: item.institute,
      term1: item.term1,
      term2: item.term2,
      term3: item.term3,
      avg: item.avg
    });
    this.term1 = item.term1;
    this.term2 = item.term2;
    this.term3 = item.term3;
    this.avg = item.avg;
  }

  addScore(){
    console.log(this.scoreForm.value);
    
    this.scoreService.addScore(this.scoreForm.value , this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },
      err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      });
  }

  updateScore(){
    this.scoreService.updateScore(this.scoreForm.value.id,this.scoreForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteScore(item){
    this.scoreService.deleteScore(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }

  addTerm1(n){
    this.term1 = parseFloat(n.target.value);
    this.avg = ((this.term1 + this.term2 + this.term3)/3).toFixed(2);
    console.log(this.term1);
    console.log(this.term2);
    console.log(this.term3);
    this.scoreForm.patchValue({avg: this.avg});
    console.log((this.scoreForm.value.avg));
    
    if(this.term1 < 0 || this.term1 > 5){
      this.warningTerm1 = true;
    } else {
      this.warningTerm1 = false;
    }
  }

  addTerm2(n){
    this.term2 = parseFloat(n.target.value);
    this.avg = ((this.term1 + this.term2 + this.term3)/3).toFixed(2);
    this.scoreForm.patchValue({avg: this.avg});
    if(this.term2 < 0 || this.term2 > 5){
      this.warningTerm2 = true;
    } else {
      this.warningTerm2 = false;
    }
  }

  addTerm3(n){
    this.term3 = parseFloat(n.target.value);
    this.avg = ((this.term1 + this.term2 + this.term3)/3).toFixed(2);
    this.scoreForm.patchValue({avg: this.avg});
    if(this.term3 < 0 || this.term3 > 5){
      this.warningTerm3 = true;
    } else {
      this.warningTerm3 = false;
    }
  }

}
