import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {UserViewModel} from "../models/User";

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.scss']
})
export class BlockedUsersComponent implements OnInit {

  public blockedUsersList !: UserViewModel[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    let userId = sessionStorage.getItem("userId");
    if (userId != null) {
      this.GetAllBlockedUsers(userId);
    }
  }

  GetAllBlockedUsers(userId : string) {
    this.userService.GetAllBlockedUsers(userId)
      .subscribe((ds) => {
        this.blockedUsersList = ds.$values;
      });
  }

  UnblockUser(friendId : string) {
    this.userService.UnblockUser(friendId).subscribe((ds) => {
      console.log(ds);
      this.ngOnInit();
    });
  }

}
