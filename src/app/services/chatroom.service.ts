import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ChatCreateModel, ChatUpdateModel, ChatViewModel} from "../models/Chat";
import {UserAccountCreateModel, UserAccountUpdateModel, UserAccountViewModel} from "../models/UserAccount";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  headers = new HttpHeaders(
    {'Content-Type': 'application/json; charset=utf-8;'}
  );
  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }

  CreateChatroom(data : ChatCreateModel) {
    return this.httpClient.post<ChatViewModel>('Chatroom/CreateChatroom', data);
  }

  EditChatroom(data : ChatUpdateModel) {
    return this.httpClient.post<ChatViewModel>('Chatroom/EditChatroom', data);
  }

  DeleteChatroom(id : number) {
    return this.httpClient.delete<boolean>('Chatroom/DeleteChatroom?chatId='+ id)
  }

  GetChatroom(id : number) {
    return this.httpClient.get<ChatViewModel>('Chatroom/GetChatroom?chatId=' + id);
  }

  GetAllChatrooms() {
    return this.httpClient.get<any>('Chatroom/GetAllChatrooms');
  }

  AddToChatroom(userId : string, chatId : number) {
    return this.httpClient.post<UserAccountCreateModel>('Chatroom/AddToChatroom?chatId=' + chatId, JSON.stringify(userId), this.options);
  }

  LeaveFromChatroom(chatId : number) {
    return this.httpClient.delete<boolean>('Chatroom/LeaveFromChatroom?chatId=' + chatId);
  }

  KickUser(userAccountId : number) {
    return this.httpClient.delete<boolean>(`Chatroom/KickUser?userAccountId=` + userAccountId);
  }

  BanUser(userAccountId : number) {
    return this.httpClient.post<UserAccountUpdateModel>(`Chatroom/BanUser`, userAccountId);
  }

  UnbanUser(userAccountId : number) {
    return this.httpClient.post<UserAccountUpdateModel>(`Chatroom/UnbanUser`, userAccountId);
  }

  SetAdmin(userAccountId : number) {
    return this.httpClient.post<UserAccountUpdateModel>(`Chatroom/SetAdmin`, userAccountId);
  }

  UnsetAdmin(userAccountId : number) {
    return this.httpClient.post<UserAccountUpdateModel>(`Chatroom/UnsetAdmin`, userAccountId);
  }

  GetAllBannedUsers(chatId : number) {
    return this.httpClient.get<any>(`Chatroom/GetAllBannedUsers?chatId=` + chatId);
  }

  GetAllAdmins(chatId : number) {
    return this.httpClient.get<any>(`Chatroom/GetAllAdmins?chatId=` + chatId);
  }

  GetAllUsers(chatId : number) {
    return this.httpClient.get<any>(`Chatroom/GetAllUsers?chatId=` + chatId);
  }
}
