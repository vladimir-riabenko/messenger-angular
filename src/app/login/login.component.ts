import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserLoginModel, UserViewModel} from "../models/User";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  private userViewModel !: UserViewModel;

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.IsTokenActive()) {
      this.router.navigate(['users']);
    }
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

  Login() {
    let userLoginModel : UserLoginModel = {
      userName: this.username.value,
      password: this.password.value
    }
    this.userService.Login(userLoginModel)
      .subscribe((response) => {
        if (response) {
          sessionStorage.setItem("username", response.userName);
          sessionStorage.setItem("userId", response.id);
          const token = response.token;
          sessionStorage.setItem("jwt", token);
          this.router.navigate(['/']);
        }
      });
  }

}
