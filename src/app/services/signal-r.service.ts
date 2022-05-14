import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import {HttpClient} from "@angular/common/http";  // or from "@microsoft/signalr" if you are using a new library;

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  constructor(private http: HttpClient) { }
  private hubConnection!: signalR.HubConnection

  public async startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44309/hubs/chat')
      .build();
    await this.hubConnection.start();
  }

  public messageListener = () => {
    this.hubConnection.on('SendMessage', (data) => {
      console.log(data);
    });
  }

  public send(group:string, message:MessageSend) {
    this.hubConnection.send("Send", group, message);
  }

  public addGroup(group:string) {
    this.hubConnection.invoke("ConnectGroup", group)
  }

  public disconnect(group:string) {
    this.hubConnection.invoke("Disconnect", group)
  }
}

export interface MessageSend {
  userName:string
  text:string
}
