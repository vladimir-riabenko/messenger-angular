import {Component, Inject, OnInit} from '@angular/core';
import {ChatroomService} from "../services/chatroom.service";
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserViewModel} from "../models/User";
import {ChatUpdateModel, ChatViewModel} from "../models/Chat";
import {UserComponent} from "../user/user.component";
import {ChatroomComponent} from "../chatroom/chatroom.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-chatroom',
  templateUrl: './edit-chatroom.component.html',
  styleUrls: ['./edit-chatroom.component.scss']
})
export class EditChatroomComponent implements OnInit {

  topic = new FormControl(this.data.topic, [Validators.required]);

  constructor(
    private chatroomService:ChatroomService,
    public dialogRef: MatDialogRef<ChatroomComponent>,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: ChatViewModel
  ) { }

  ngOnInit(): void {
  }

  EditChatroom() {
    let model : ChatUpdateModel = {
      id:this.data.id,
      topic:this.topic.value,
    }
    this.chatroomService.EditChatroom(model)
      .subscribe((ds) => {
        window.location.reload();
      });
  }

  DeleteChatroom(chatId : number) {
    this.chatroomService.DeleteChatroom(chatId)
      .subscribe((ds) => {
        this.router.navigate(['/']).then((s) => {
          window.location.reload()
        })

      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
