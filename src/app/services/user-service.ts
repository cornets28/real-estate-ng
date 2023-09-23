import { Injectable } from '@angular/core';
import { UserLoginComponent } from '../user/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // if user already exists, do not overwrite it but add other users just created
  addUser(user: UserLoginComponent) {
    let users: any[] = [];
    if (localStorage.getItem("Users")) {
      // @ts-ignore
      users = JSON.parse(localStorage.getItem("Users"));
      users = [user, ...users];
      console.log("USERS1: ", users)
    } else {
      users = [user];
    }
    localStorage.setItem("Users", JSON.stringify(users));
    console.log("USERS2: ", users)
  }

}
