import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user.service";
import {ChatCreateModel, ChatUpdateModel, ChatViewModel} from "../models/Chat";
import {ChatroomService} from "../services/chatroom.service";
import {UserAccountViewModel} from "../models/UserAccount";
import {MessageCreateModel, MessageUpdateModel, MessageViewModel} from "../models/Message";
import {MessageService} from "../services/message.service";
import {UsersComponent} from "../users/users.component";
import {MatDialog} from "@angular/material/dialog";
import {FriendsComponent} from "../friends/friends.component";
import {EditChatroomComponent} from "../edit-chatroom/edit-chatroom.component";
import {MessageSend, SignalRService} from "../services/signal-r.service";
import * as signalR from "@aspnet/signalr";
import {ActivatedRoute, Router} from "@angular/router";
import {MembersComponent} from "../members/members.component";
import {EditMessageComponent} from "../edit-message/edit-message.component";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  @ViewChild('attachmentInput') attachmentInput!: ElementRef;

  currentChatroom !: ChatViewModel;
  messagesList !: MessageViewModel[];
  signalrGroup !: string;

  messageText : string = '';
  userId !: string;
  files!: File[];

  chatId :number = 0;

  messagesUrlStart = 'https://localhost:44309/Images/';

  constructor(
    private chatroomService:ChatroomService,
    private messageService:MessageService,
    private userService:UserService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(async val => {
      if (this.signalrGroup) {
        this.SignalRDisconnect(this.signalrGroup);
      }
      this.route.params.subscribe(params => {
        this.chatId = +params['id'];
      })
      this.GetChatroom(this.chatId);
      this.ngOnInit();
      await this.SignalRStartConnection()
      this.SignalRMessageListener();
      this.signalrGroup = this.chatId.toString()
      this.SignalRAddGroup(this.signalrGroup);
      let userId = sessionStorage.getItem("userId");

      if (userId !== null) {
        this.userId = userId;
      }
    });
  }

  ngOnInit(): void {
    this.GetMessagesFromChat(this.chatId);
  }

  private hubConnection!: signalR.HubConnection

  public async SignalRStartConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44309/hubs/chat')
      .build();
    await this.hubConnection.start();
  }

  public SignalRMessageListener = () => {
    this.hubConnection.on('SendMessage', (data) => {
      this.ngOnInit();
    });
  }

  public SignalRSend(group:string, message:MessageSend) {
    this.hubConnection.send("Send", group, message);
  }

  public SignalRAddGroup(group:string) {
    this.hubConnection.invoke("ConnectGroup", group)
  }

  public SignalRDisconnect(group:string) {
    this.hubConnection.invoke("Disconnect", group)
  }

  resetFileInput(event : any) {
    event.preventDefault();
    this.attachmentInput.nativeElement.value = '';
  }

  onFileSelected(event : any) {
    const file:File = event.target.files[0];
    if (file) {
      this.files = event.target.files;
      console.log(this.files);
    }
  }

  OpenDialogFriends(): void {
    this.dialog.open(FriendsComponent, {
      width: '600px',
      height: '80%',
      data:this.currentChatroom.id,
    });
  }

  OpenDialogMembers(): void {
    this.dialog.open(MembersComponent, {
      width: '600px',
      height: '80%',
      data:this.currentChatroom.id,
    });
  }

  OpenDialogEdit(): void {
    this.dialog.open(EditChatroomComponent, {
      data:this.currentChatroom,
    });
  }

  OpenDialogEditMessage(message : MessageViewModel): void {
    if (message.user.id === this.userId) {
      this.dialog.open(EditMessageComponent, {
        data:message,
      });
    }
  }

  isMine(message : MessageViewModel) {
    return message.user.id === this.userId;
  }

  GetTheSender(message : MessageViewModel) {
    let userId = message.user.id;
    let userName = 'You'
    if (userId !== this.userId) {
      userName = message.user.userName;
    }
    return userName;
  }

  GetMessagesFromChat(chatId : number) {
    this.messageService.GetMessagesFromChat(chatId)
      .subscribe((ds) =>
      {
        console.log(ds);
        this.messagesList = ds.$values.reverse();
      })
  }

  SendMessage(messageText : string) {
    let messageFormData = new FormData();
    messageFormData.append('chatId', this.currentChatroom.id.toString());
    messageFormData.append('userId', this.userId);
    messageFormData.append('text', messageText);
    if(this.files) {
      for (let i = 0; i < this.files.length; i++) {
        let file: File = this.files[i];
        messageFormData.append('files', file, file.name);
      }
    }

    let messageSend : MessageSend = {
      userName:'username',
      text:messageText
    }

    this.messageService.SendMessage(messageFormData)
      .subscribe((ds) =>
      {
        this.SignalRSend(this.signalrGroup, messageSend)
        this.messageText = '';
        this.files = [];
      })
  }

  GetChatroom(chatId : number) {
    this.chatroomService.GetChatroom(chatId)
      .subscribe((ds) => {
        this.currentChatroom = ds;
      });
  }

  LeaveFromChatroom(chatId : number) {
    this.chatroomService.LeaveFromChatroom(chatId)
      .subscribe((ds) => {
      });
  }
}
