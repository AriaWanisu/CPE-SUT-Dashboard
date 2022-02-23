import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: any;
  isAdmin: boolean = false;

  constructor(public local: LocalStorageService,private us: UserService) { }

  ngOnInit(): void {
    if(this.local.get('user').result.role == "Admin"){
      this.isAdmin = true;
    }
    this.us.getUser().subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        console.log("can't get user");
      }
    );
  }

  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    img: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^0[0-9]{9}/), Validators.minLength(10), Validators.maxLength(10)]),
  });

}
