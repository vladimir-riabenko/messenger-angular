import {ChatViewModel} from "./Chat";
import {UserViewModel} from "./User";

export interface UserAccountViewModel {
  id:number,
  //chat:ChatViewModel,
  user:UserViewModel,
  isBanned:boolean,
  isAdmin:boolean,
  isOwner:boolean
}

export interface UserAccountCreateModel {
  chatId:number,
  userId:string,
  isBanned:boolean,
  isAdmin:boolean,
  isOwner:boolean
}

export interface UserAccountUpdateModel {
  id:number,
  isBanned:boolean,
  isAdmin:boolean,
  isOwner:boolean
}
