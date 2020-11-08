import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../../utils/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _alertService: MatSnackBar,
    private _router: Router
  ) { }
  model: User = new User();

  ngOnInit(): void {
    this.getUserInfo()
  }

  onProfileUpdated(profileForm: NgForm) {
    if (!profileForm.valid) {
      this._alertService.open(
        'Lütfen Kullanıcı bilgilerini düzgün doldurunuz',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      this._userService.userProfileUpdate({
        UserName: profileForm.value.UserName,
        UserMail: profileForm.value.UserMail,
        UserPassword: profileForm.value.UserPassword,
        UserFirstName: profileForm.value.UserFirstName,
        UserLastName: profileForm.value.UserLastName,
      }, JSON.parse(localStorage.getItem('currentUser')).id)
        .pipe(first())
        .subscribe(
          data => {
            this._router.navigate(['user']);
          },
          error => {
          });
    }
  }

  getUserInfo() {
    this._userService
      .userGetById(JSON.parse(localStorage.getItem('currentUser')).id)
      .subscribe(data => {
        this.model.UserName = data['user_data'].UserName;
        this.model.UserFirstName = data['user_data'].UserFirstName;
        this.model.UserLastName = data['user_data'].UserLastName;
        this.model.UserMail = data['user_data'].UserMail;
        this.model.UserPassword = data['user_data'].UserPassword;
      })
  }
}
