import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { AuthService } from '../../../utils/services/auth/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _alertService: MatSnackBar,
  ) { }

  modelUser: User = new User();

  ngOnInit() {
  }

  onSave(registerForm: NgForm) {
    if (!registerForm.valid) {
      this._alertService.open(
        'Lütfen Kullanıcı bilgilerini düzgün doldur!!!!',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      this._authService.register({
        UserName: registerForm.value.UserName,
        UserMail: registerForm.value.UserMail,
        UserPassword: registerForm.value.UserPassword,
        UserFirstName: registerForm.value.UserFirstName,
        UserLastName: registerForm.value.UserLastName,
        UserType: 0,
        UserStatus: 0
      })
        .pipe(first())
        .subscribe(
          data => {
            console.log('data', data);
            this._router.navigate(['login']);
          },
          error => {
            console.log('error', error);
          });
    }
  }
}
