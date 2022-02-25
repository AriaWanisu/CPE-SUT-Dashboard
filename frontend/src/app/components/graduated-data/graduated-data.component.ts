import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
import { ExcelService } from 'src/app/services/excel.service'
import { GraduetedService } from 'src/app/services/gradueted.service'

@Component({
  selector: 'app-graduated-data',
  templateUrl: './graduated-data.component.html',
  styleUrls: ['./graduated-data.component.css']
})
export class GraduatedDataComponent implements OnInit {

  gradueted: any;
  token: any;
  
  isAdd: boolean = false;
  isEdit: boolean = false;
  early: any = 0;
  normal: any = 0;
  over: any = 0;
  other: any = 0;

  graduatedForm = new FormGroup({
    id: new FormControl(''),
    year: new FormControl('',[Validators.required]),
    early: new FormControl('',[Validators.required]),
    normal: new FormControl('',[Validators.required]),
    over: new FormControl('',[Validators.required]),
    other: new FormControl('',[Validators.required]),
  });

  constructor(private graduetedService: GraduetedService,public local: LocalStorageService, private excelService:ExcelService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.graduetedService.getGraduated().subscribe(
      (res) => {
        this.gradueted = res
      }
    )
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.gradueted, 'gradueted');
  }

  openAdd(){
    this.isAdd = !this.isAdd;
    this.isEdit = false;
    this.graduatedForm.reset();
    this.early = 0;
    this.normal = 0;
    this.over = 0;
    this.other = 0;
  }

  openEdit(data){
    this.isEdit = true;
    this.isAdd = false;
    this.graduatedForm.patchValue({
      id: data._id,
      year: data.year,
      early: data.early,
      normal: data.normal,
      over: data.over,
      other: data.other
    });
    this.early = parseInt(data.early);
    this.normal = parseInt(data.normal);
    this.over = parseInt(data.over)
    this.other = parseInt(data.other)
  }

  addData(){
    console.log(this.graduatedForm.value);
    
    this.graduetedService.addGraduated(this.graduatedForm.value , this.token).subscribe(
      data => {
        alert('เพิ่มข้อมูลสำเร็จ');
        window.location.reload();
      },
      err => {
        console.log(err);
        alert('เพิ่มข้อมูลไม่สำเร็จ!');
      });
  }

  updateGradueted(){
    this.graduetedService.updateGraduated(this.graduatedForm.value.id,this.graduatedForm.value, this.token).subscribe(
      data => {
        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('แก้ไขข้อมูลไม่สำเร็จ!');
      });
  }

  deleteGradueted(item){
    this.graduetedService.deleteGraduated(item._id).subscribe(
      data => {
        alert('ลบข้อมูลสำเร็จ');
        window.location.reload();
      }, err => {
        console.log(err);
        alert('ลบข้อมูลไม่สำเร็จ!');
      });
  }

}
