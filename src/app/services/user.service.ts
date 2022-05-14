import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserChangePasswordModel, UserCreateModel, UserLoginModel, UserUpdateModel, UserViewModel} from "../models/User";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders(
    {'Content-Type': 'application/json; charset=utf-8;'}
  );
  options = { headers: this.headers };

  constructor(private httpClient: HttpClient, private router:Router) { }

  Register(data : UserCreateModel) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/Register', data)
  }

  Login(data : UserLoginModel) {
    return this.httpClient.post<UserViewModel>('Account/Login', data);
  }

  IsTokenActive() {
    const token = sessionStorage.getItem("jwt");
    return token != null;

  }

  Logout() {
    sessionStorage.removeItem("jwt");
    this.router.navigate(['login']);
  }

  ChangePassword(data : UserChangePasswordModel) {
    return this.httpClient.post('Account/ChangePassword', data)
  }

  GetAllUsers() : Observable<UserViewModel[]> {
    return this.httpClient.get<UserViewModel[]>('Account/GetAllUsers');
  }

  GetUser(id:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/GetUser', JSON.stringify(id), this.options);
  }

  GetUserByUserName(username:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/GetUserByUserName', JSON.stringify(username), this.options);
  }

  AddFriend(friendId:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/AddFriend', JSON.stringify(friendId), this.options);
  }

  DeleteFriend(friendId:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/DeleteFriend', JSON.stringify(friendId), this.options);
  }

  BlockUser(userId:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/BlockUser', JSON.stringify(userId), this.options);
  }

  UnblockUser(userId:string) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/UnblockUser', JSON.stringify(userId), this.options);
  }

  UpdateUser(data : UserUpdateModel) : Observable<UserViewModel> {
    return this.httpClient.post<UserViewModel>('Account/UpdateUser', data);
  }

  GetAllFriends(userId : string) : Observable<any>{
    return this.httpClient.post<any>('Account/GetAllFriends', JSON.stringify(userId), this.options);
  }

  GetAllBlockedUsers(userId : string) : Observable<any> {
    return this.httpClient.post<any>('Account/GetAllBlockedUsers', JSON.stringify(userId), this.options);
  }
}
