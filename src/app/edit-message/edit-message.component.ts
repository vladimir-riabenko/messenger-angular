import {Component, Inject, OnInit} from '@angular/core';
import {MessageUpdateModel, MessageViewModel} from "../models/Message";
import {MessageService} from "../services/message.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChatroomComponent} from "../chatroom/chatroom.component";
import {ChatViewModel} from "../models/Chat";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.scss']
})
export class EditMessageComponent implements OnInit {

  messageUpdateModel : MessageUpdateModel = {
    id:this.data.id,
    text:this.data.text,
  }
  messageText = new FormControl(this.data.text, [Validators.required]);

  constructor(
    private messageService:MessageService,
    public dialogRef: MatDialogRef<ChatroomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MessageViewModel
  ) { }

  ngOnInit(): void {
  }

  EditMessage() {
    this.messageUpdateModel.text = this.messageText.value;
    this.messageService.EditMessage(this.messageUpdateModel)
      .subscribe((ds) =>
      {
        window.location.reload()
      })
  }

  DeleteMessage(messageId : number) {
    this.messageService.DeleteMessage(messageId)
      .subscribe((ds) =>
      {
        window.location.reload()
      })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
