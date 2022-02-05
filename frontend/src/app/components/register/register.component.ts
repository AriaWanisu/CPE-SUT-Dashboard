import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    sex: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordCheck: new FormControl('', [Validators.required, Validators.minLength(8)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^0[0-9]{9}/), Validators.minLength(10), Validators.maxLength(10)]),
  });

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  signup() {
    console.log(this.profileForm.value);
    this.auth.signUp(this.profileForm.value).subscribe(
      data => {
        alert('ลงทะเบียนสำเร็จ!!')
        this.profileForm.reset();
      },
      err => {
        console.log(err);
        if (err.error) {
          alert(err.error);
        }
        else {
          alert("ลงทะเบียนไม่สำเร็จ");
        }
      });
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get sex() {
    return this.profileForm.get('sex');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get passwordCheck() {
    return this.profileForm.get('passwordCheck');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

}
