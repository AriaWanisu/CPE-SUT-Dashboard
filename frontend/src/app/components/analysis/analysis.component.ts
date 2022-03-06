import { Component, OnInit } from '@angular/core';
import { AnalysisService } from 'src/app/services/analysis.service';
import { LocalStorageService } from 'angular-web-storage';
import { ExcelService } from 'src/app/services/excel.service'
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  analysisList: any;
  writterList: any;
  token: any;
  
  //check logic
  add: boolean = false;
  edit: boolean = false;

  constructor(private analysisService: AnalysisService,public local: LocalStorageService, private excelService:ExcelService, private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;
    this.analysisService.getAnalysisList(this.token).subscribe(
      (res) => {
        this.analysisList = res;
      }
    )
    
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.analysisList, 'analysis_data');
  }

  getWritter(item){
    this.userService.getUserById(item.editor).subscribe(
      (res) => {
        return res.firstName + " " + res.lastName;
      }
    )
  }

}
