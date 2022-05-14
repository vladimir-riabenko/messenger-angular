import {ChatViewModel} from "./Chat";
import {UserViewModel} from "./User";
import {MessageImageViewModel} from "./MessageImage";

export interface MessageViewModel {
  id:number,
  chat:ChatViewModel,
  user:UserViewModel,
  images:any,
  text:string,
  createdTime:Date
}

export interface MessageCreateModel {
  chatId:number,
  userId:string,
  files?:any,
  text?:string
}

export interface MessageUpdateModel {
  id:number,
  text?:string,
  imageId?:number,
  file?:File
}
