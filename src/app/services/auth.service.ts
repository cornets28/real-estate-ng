import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any) {
    let userArray = [];
    if (localStorage.getItem('Users')) {
      // @ts-expect-error
      userArray = JSON.parse(localStorage.getItem('Users'));
    }
    return userArray.find((p: { userName: string; password: string; }) => p.userName === user.userName && p.password === user.password)
  }
}
