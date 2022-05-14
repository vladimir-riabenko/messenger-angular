import {MessageViewModel} from "./Message";
import {UserAccountViewModel} from "./UserAccount";

export interface ChatViewModel {
  id:number,
  topic:string,
  messages:any,
  users:any
}

export interface ChatCreateModel {
  topic:string,
  userId:string
}

export interface ChatUpdateModel {
  id:number,
  topic:string
}
