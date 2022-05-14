import {Component, Inject, OnInit} from '@angular/core';
import {ChatroomService} from "../services/chatroom.service";
import {UserViewModel} from "../models/User";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {UserAccountViewModel} from "../models/UserAccount";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members !: UserAccountViewModel[];
  admins !: UserAccountViewModel[];
  bannedUsers !: UserAccountViewModel[];

  userId = sessionStorage.getItem("userId");

  constructor(
    private chatroomService:ChatroomService,
    private userService:UserService,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {

    this.GetAllUsers(this.data);
    this.GetAllAdmins(this.data);
    this.GetAllBannedUsers(this.data);
  }

  KickUser(userAccountId : number) {
    this.chatroomService.KickUser(userAccountId)
      .subscribe((ds) => {
        this.ngOnInit();
      });
  }

  BanUser(userAccountId : number) {
    this.chatroomService.BanUser(userAccountId)
      .subscribe((ds) => {
        this.ngOnInit();
      });
  }

  UnbanUser(userAccountId : number) {
    this.chatroomService.UnbanUser(userAccountId)
      .subscribe((ds) => {
        this.ngOnInit();
      });
  }

  SetAdmin(userAccountId : number) {
    this.chatroomService.SetAdmin(userAccountId)
      .subscribe((ds) => {
        this.ngOnInit();
      });
  }

  UnsetAdmin(userAccountId : number) {
    this.chatroomService.UnsetAdmin(userAccountId)
      .subscribe((ds) => {
        this.ngOnInit();
      });
  }

  GetAllBannedUsers(chatId : number) {
    this.chatroomService.GetAllBannedUsers(chatId)
      .subscribe((ds) => {
        this.bannedUsers = ds.$values;
      });
  }

  GetAllAdmins(chatId : number) {
    this.chatroomService.GetAllAdmins(chatId)
      .subscribe((ds) => {
        this.admins = ds.$values;
      });
  }

  GetAllUsers(chatId : number) {
    this.chatroomService.GetAllUsers(chatId)
      .subscribe((ds) => {
        this.members = ds.$values;
      });
  }

}
