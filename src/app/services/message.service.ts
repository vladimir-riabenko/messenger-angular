import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageCreateModel, MessageUpdateModel, MessageViewModel} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  SendMessage(data : any) {
    let headers = new HttpHeaders(
      {'Content-Type': ''});
    let options = { headers: headers };
    return this.httpClient.post<MessageViewModel>(`Message/SendMessage`, data)
  }

  EditMessage(data : MessageUpdateModel) {
    return this.httpClient.post<MessageViewModel>(`Message/EditMessage`, data)
  }

  DeleteMessage(messageId : number) {
    return this.httpClient.delete<MessageViewModel>(`Message/DeleteMessage?messageId=` + messageId)
  }

  GetMessage(messageId : number) {
    return this.httpClient.get<MessageViewModel>(`Message/GetMessage?messageId=` + messageId)
  }

  GetMessagesFromChat(chatId : number) {
    return this.httpClient.get<any>(`Message/GetMessagesFromChat?chatId=` + chatId)
  }

  GetMessagesFromChatByDate(chatId : number, date : string) {
    return this.httpClient.get<MessageViewModel[]>(`Message/GetMessagesFromChat?chatId=` + chatId + '&date=' + date )
  }
}
