import {Component, Inject, OnInit} from '@angular/core';
import {UserComponent} from "../user/user.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserChangePasswordModel, UserUpdateModel, UserViewModel} from "../models/User";
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  hideOld = true;
  hideNew = true;

  username = new FormControl(this.data.userName, [Validators.required, Validators.maxLength(25)]);
  email = new FormControl(this.data.email, [Validators.required, Validators.email]);
  oldPassword = new FormControl('', [Validators.required]);
  newPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);

  changePasswordForm = false;

  userChangePasswordModel !: UserChangePasswordModel;
  userUpdateModel : UserUpdateModel = {
    id:this.data.id,
    userName:this.data.userName,
    email:this.data.email,
  };

  constructor(
    private userService:UserService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserViewModel,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getOldPasswordErrorMessage() {
    if (this.oldPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  getNewPasswordErrorMessage() {
    if (this.newPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  ChangePassword() {
    this.userChangePasswordModel = {
      id:this.data.id,
      oldPassword:this.oldPassword.value,
      newPassword:this.newPassword.value
    }
    return this.userService.ChangePassword(this.userChangePasswordModel).subscribe((ds) => {
      console.log(ds);
      window.location.reload();
    });
  }

  UpdateUser() {
    if (this.userUpdateModel.userName !== this.username.value || this.userUpdateModel.email !== this.email.value) {
      this.userUpdateModel.userName = this.username.value;
      this.userUpdateModel.email = this.email.value;
      this.userService.UpdateUser(this.userUpdateModel).subscribe((ds) => {
        console.log(ds);
        window.location.reload();
      });
    }
  }
}
