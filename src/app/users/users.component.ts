import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserViewModel} from "../models/User";
import {FriendsComponent} from "../friends/friends.component";
import {BlockedUsersComponent} from "../blocked-users/blocked-users.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public blockedUsersList : UserViewModel[] = [];

  @ViewChild(FriendsComponent) friendsComponent!:FriendsComponent;
  @ViewChild(BlockedUsersComponent) blockedUsersComponent!:BlockedUsersComponent;

  ngAfterViewInit() {
    this.friendsComponent.ngOnInit();
    this.blockedUsersComponent.ngOnInit();
  }

  public searchInputValue = '';

  public searchResult !: UserViewModel;

  constructor(private userService:UserService) { }

  ngOnInit(): void {

  }

  GetUserByUserName(username : string) {
    this.userService.GetUserByUserName(username).subscribe((ds) => {
      this.searchResult = ds;
    });
  }

  AddFriend(friendId : string) {
    this.userService.AddFriend(friendId).subscribe((ds) => {
      console.log(ds);
      this.ngAfterViewInit();
    });
  }

  BlockUser(bannedUserId : string) {
    this.userService.BlockUser(bannedUserId).subscribe((ds) => {
      console.log(ds);
      this.ngOnInit();
      this.ngAfterViewInit();
    });
  }
}
