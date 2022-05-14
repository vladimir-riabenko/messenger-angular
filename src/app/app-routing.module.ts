import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ChatroomComponent} from "./chatroom/chatroom.component";
import {MessageComponent} from "./message/message.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService], children: [
      { path: 'chat/:id', component: ChatroomComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
