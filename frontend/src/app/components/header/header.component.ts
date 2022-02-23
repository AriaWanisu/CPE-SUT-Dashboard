import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public local: LocalStorageService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.local.remove('user');
  }

}
