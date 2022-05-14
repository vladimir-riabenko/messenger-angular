import {Component, Inject, OnInit} from '@angular/core';
import {UserViewModel} from "../models/User";
import {UserService} from "../services/user.service";
import {ChatroomService} from "../services/chatroom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserComponent} from "../user/user.component";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public friendsList !: UserViewModel[];
  constructor(
    private userService:UserService,
    private chatroomService:ChatroomService,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,) { }

  ngOnInit(): void {
    let userId = sessionStorage.getItem("userId");
    if (userId != null) {
      this.GetAllFriends(userId);
    }
  }

  GetAllFriends(userId : string) {
    this.userService.GetAllFriends(userId)
      .subscribe((ds) => {
      this.friendsList = ds.$values;
    });
  }

  DeleteFriend(friendId : string) {
    this.userService.DeleteFriend(friendId).subscribe((ds) => {
      console.log(ds);
      this.ngOnInit();
    });
  }

  AddToChatroom(userId : string, chatId : number) {
    this.chatroomService.AddToChatroom(userId, chatId)
      .subscribe((ds) => {
        window.location.reload();
      });
  }
}
