import { Component, OnInit } from '@angular/core';
import {UserCreateModel} from "../models/User";
import {UserService} from "../services/user.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;

  username = new FormControl('', [Validators.required, Validators.maxLength(25)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.IsTokenActive()) {
      this.router.navigate(['users']);
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  Register() {
    let userCreateModel : UserCreateModel = {
      userName: this.username.value,
      email: this.email.value,
      password: this.password.value
    };
    return this.userService.Register(userCreateModel).subscribe((response) => {
      if (response) {
        this.router.navigate(['login']);
      }
    });
  }
}
