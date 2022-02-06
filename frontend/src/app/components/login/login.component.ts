import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string;

  authForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('Member')
  });

  constructor(public local: LocalStorageService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  
  check() {
    console.log(this.authForm.value);
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
