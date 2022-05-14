import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ChatroomService} from "../services/chatroom.service";
import {ChatViewModel} from "../models/Chat";

@Component({
  selector: 'app-all-chatrooms',
  templateUrl: './all-chatrooms.component.html',
  styleUrls: ['./all-chatrooms.component.scss']
})
export class AllChatroomsComponent implements OnInit {

  public allChatrooms !: ChatViewModel[];

  constructor(
    private chatroomService:ChatroomService
  ) { }

  ngOnInit(): void {
    this.GetAllChatrooms();
  }

  GetAllChatrooms() {
    this.chatroomService.GetAllChatrooms()
      .subscribe((ds) => {
        this.allChatrooms = ds.$values;
      });
  }
}
