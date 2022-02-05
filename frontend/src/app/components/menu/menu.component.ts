import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public local: LocalStorageService) { }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    img: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^0[0-9]{9}/), Validators.minLength(10), Validators.maxLength(10)]),
  });


}
