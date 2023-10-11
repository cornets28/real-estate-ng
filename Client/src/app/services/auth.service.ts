import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/account/login', user)
    // let userArray = [];
    // if (localStorage.getItem('Users')) {
    //   // @ts-expect-error
    //   userArray = JSON.parse(localStorage.getItem('Users'));
    // }
    // return userArray.find((p: { userName: string; password: string; }) => p.userName === user.userName && p.password === user.password)
  }

  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/account/register', user);
  }


}
