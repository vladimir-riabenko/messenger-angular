import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { UserComponent } from './user/user.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MessageComponent } from './message/message.component';
import {APIInterceptor} from "./services/apiinterceptor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthGuardService} from "./services/auth-guard.service";
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { FriendsComponent } from './friends/friends.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { CreateChatComponent } from './create-chat/create-chat.component';
import { AllChatroomsComponent } from './all-chatrooms/all-chatrooms.component';
import { SettingsComponent } from './settings/settings.component';
import { EditChatroomComponent } from './edit-chatroom/edit-chatroom.component';
import { MembersComponent } from './members/members.component';
import { EditMessageComponent } from './edit-message/edit-message.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ChatroomComponent,
    MessageComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UsersComponent,
    FriendsComponent,
    BlockedUsersComponent,
    CreateChatComponent,
    AllChatroomsComponent,
    SettingsComponent,
    EditChatroomComponent,
    MembersComponent,
    EditMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
