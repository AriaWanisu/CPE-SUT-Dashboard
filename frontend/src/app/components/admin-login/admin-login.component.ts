import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  token: string;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public local: LocalStorageService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    console.log(this.authForm.value);
    this.auth.signIn(this.authForm.value).subscribe(
      data => {
        if (data.status == true) {
          this.router.navigate(['/dashboard'])
        } else {
          alert('Username or Password is incorrect!');
        }
      },
      err => {
        console.log(err);
        alert('Username or Password is incorrect!');
      });

  }

}
