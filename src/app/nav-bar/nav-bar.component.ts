import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  // @ts-ignore
  loggedinUser: string;

  constructor(private alertify: AlertifyService) { }
  
  ngOnInit() {
      
  }

  loggedIn() {
    // @ts-ignore
    this.loggedinUser = localStorage.getItem('token');
    // @ts-ignore
    return  this.loggedinUser
  }

  onLogout() {
    localStorage.removeItem('token');
    this.alertify.error('You are logged out')
  }
}
