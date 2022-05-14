import { Component, OnInit } from '@angular/core';
import {MessageCreateModel, MessageUpdateModel, MessageViewModel} from "../models/Message";
import {MessageService} from "../services/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  ngOnInit(): void {
  }

  GetMessage(messageId : number) {
    this.messageService.GetMessage(messageId)
      .subscribe((ds) =>
      {
        console.log(ds);
      })
  }

  GetMessagesFromChatByDate(chatId : number, date : string) {
    this.messageService.GetMessagesFromChatByDate(chatId, date)
      .subscribe((ds) =>
      {
        console.log(ds);
      })
  }
}
