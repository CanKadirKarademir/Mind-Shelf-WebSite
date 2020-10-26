import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }
  model: User = new User();
  ngOnInit() {
    this.model.UserMail = "kadircankarademir@hotmail.com";
  }


  onLogin(loginForm: NgForm) {
    console.log("uloo", loginForm.value.UserMail)
    localStorage.setItem('auth', 'true');
    this._router.navigateByUrl('user');
  }

}
