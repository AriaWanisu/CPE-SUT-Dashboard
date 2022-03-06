import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-gender-table',
  templateUrl: './gender-table.component.html',
  styleUrls: ['./gender-table.component.css']
})
export class GenderTableComponent implements OnInit {

  genders: any;
  token: any;

  constructor(private studentService: StudentService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.studentService.getStudentGender(this.token).subscribe(
      (res) => {
        this.genders = res
      }
    )
  }

}
