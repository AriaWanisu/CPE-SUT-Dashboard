import { Component, OnInit } from '@angular/core';
import { WorkService } from 'src/app/services/work.service'
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.css']
})
export class WorkTableComponent implements OnInit {

  works: any;
  token: any;

  constructor(private workService: WorkService, public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.workService.getWork(this.token).subscribe(
      (res) => {
        this.works = res
      }
    )
  }

}
