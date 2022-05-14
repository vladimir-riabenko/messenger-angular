export interface UserViewModel {
  id:string,
  userName:string,
  password:string,
  email:string,
  token:string,
}

export interface UserCreateModel {
  userName:string,
  password:string,
  email:string,
}

export interface UserChangePasswordModel {
  id:string,
  oldPassword:string
  newPassword:string
}

export interface UserLoginModel {
  userName:string,
  password:string
}

export interface UserUpdateModel {
  id:string,
  userName:string,
  email:string
}
