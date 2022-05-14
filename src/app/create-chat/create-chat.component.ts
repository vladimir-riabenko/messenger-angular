import { Component, OnInit } from '@angular/core';
import {ChatCreateModel} from "../models/Chat";
import {ChatroomService} from "../services/chatroom.service";

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent implements OnInit {

  public chatCreateModel : ChatCreateModel = {
    topic: "",
    userId: ""
  };

  constructor(private chatroomService : ChatroomService) { }

  ngOnInit(): void {
    let userId = sessionStorage.getItem("userId");
    if (userId != null)
      this.chatCreateModel.userId = userId;
  }

  CreateChatroom(data : ChatCreateModel) {
    this.chatroomService.CreateChatroom(data)
      .subscribe((ds) => {
        console.log(ds);
        window.location.reload();
      })
  }

}
