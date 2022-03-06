import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service'; 
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  students: any;
  token: any;

  constructor(private studentService: StudentService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.studentService.getStudent(this.token).subscribe(
      (res) => {
        this.students = res
      }
    )
  }

}
