import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../utils/services/auth/auth.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authservice: AuthService,
    private _alertService: MatSnackBar
  ) {
    // Eğer giriş yapılmışsa ana sayfaya yönlendiriliyor
    if (this._authservice.currentUserValue) {
      this._router.navigate(['user/libraries']);
    }
  }

  modelUser: User = new User();
  user: User;

  ngOnInit() {
  }

  onLogin(loginForm: NgForm) {
    if (!loginForm.valid) {
      this._alertService.open(
        'Kullancı adı veya şifre boş bırakılamaz!',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      this._authservice.login(
        {
          UserName: loginForm.value.UserName,
          UserPassword: loginForm.value.UserPassword
        })
        .pipe(first())
        .subscribe(
          data => {
            this._router.navigate(['user/libraries']);
          },
          error => {
            this._alertService.open(
              'Kullancı adı veya şifre Doğru Değil!',
              'HATA',
              {
                duration: 2000,
              }
            );
            this.modelUser.UserName = '';
            this.modelUser.UserPassword = '';
          });
    }
  }
}
