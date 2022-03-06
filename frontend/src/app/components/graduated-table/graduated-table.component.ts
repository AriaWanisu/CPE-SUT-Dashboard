import { Component, OnInit } from '@angular/core';
import { GraduetedService } from 'src/app/services/gradueted.service'
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-graduated-table',
  templateUrl: './graduated-table.component.html',
  styleUrls: ['./graduated-table.component.css']
})
export class GraduatedTableComponent implements OnInit {

  gradueted: any;
  token: any;

  constructor(private graduetedService: GraduetedService,public local: LocalStorageService) { }

  ngOnInit(): void {
    this.token = this.local.get('user').token;

    this.graduetedService.getGraduated().subscribe(
      (res) => {
        this.gradueted = res
      }
    )
  }

}
