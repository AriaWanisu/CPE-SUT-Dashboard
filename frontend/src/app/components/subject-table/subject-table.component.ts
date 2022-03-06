import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { SubjectService } from 'src/app/services/subject.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subject-table',
  templateUrl: './subject-table.component.html',
  styleUrls: ['./subject-table.component.css']
})
export class SubjectTableComponent implements OnInit {
  
  subjects: any;
  subjectList: any;
  subjectTable: any;
  token: any;

  table: any;

  targetSubject = new FormGroup({
    subject: new FormControl('เลือกวิชา')
  })

  constructor(public local: LocalStorageService, private subjectService: SubjectService) { }

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

  selectSubject(){
    this.table = true;
    this.subjectService.getListSubject(this.targetSubject.value,this.token).subscribe(
      (res) => {
        this.subjectTable = res;
        console.log(res);
      }
    )
  }

}
