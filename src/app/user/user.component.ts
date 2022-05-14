import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserChangePasswordModel, UserCreateModel, UserLoginModel, UserUpdateModel, UserViewModel} from "../models/User";
import {Observable} from "rxjs";
import { NgForm } from '@angular/forms';
import {UsersComponent} from "../users/users.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateChatComponent} from "../create-chat/create-chat.component";
import {SettingsComponent} from "../settings/settings.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public currentUser !: UserViewModel;

  constructor(private userService:UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let userId = sessionStorage.getItem("userId");
    if (userId != null) {
      this.GetUser(userId).subscribe((ds) => {
        this.currentUser = ds;
      });
    }

  }

  openDialogFriends(): void {
    this.dialog.open(UsersComponent, {
      width: '600px',
      height: '80%'
    });
  }

  openDialogSettings(): void {
    this.dialog.open(SettingsComponent, {
      data: this.currentUser,
    });
  }

  openDialogCreateChatroom(): void {
    this.dialog.open(CreateChatComponent, {
    });
  }

  Logout() {
    return this.userService.Logout();
  }

  GetUser(userId : string) {
    return this.userService.GetUser(userId);
  }
}
