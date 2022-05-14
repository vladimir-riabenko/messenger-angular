import {MessageViewModel} from "./Message";

export interface MessageImageViewModel {
  id:number,
  path:string,
  message:MessageViewModel
}

export interface MessageImageCreateModel {
  path:string,
  messageId:number
}

export interface MessageImageUpdateModel {
  id:number,
  path:string
}
