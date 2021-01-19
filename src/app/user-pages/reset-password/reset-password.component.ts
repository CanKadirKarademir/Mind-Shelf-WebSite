import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/utils/services/auth/auth.service';
import { UserToken } from 'src/utils/services/user_token';
import { User } from '../../models/user'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<any>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _alertService: MatSnackBar,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('currentUser')));
  }
  modelUser: User = new User();

  ngOnInit(): void {

  }
  onSave(resetPasswordForm: NgForm) {
    if (!resetPasswordForm.valid) {
      this._alertService.open(
        'Lütfen Bilgilerin doğru olduğundan emin olun !',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      try {
        this._authService.changePassword(
          { UserPassword: resetPasswordForm.value.UserPassword },
          JSON.parse(localStorage.getItem('resetUserPassword')).UserID).subscribe(data => {
            this._alertService.open(
              'Şifreniz güncellenmiştir !',
              'ONAY',
              {
                duration: 2000,
              }
            );
            localStorage.removeItem('resetUserPassword');
            this.currentUserSubject.next(null);
          });
      } catch (error) {
        this._alertService.open(
          'Şifreniz güncellenemedi!',
          'HATA',
          {
            duration: 2000,
          }
        );
      }
      this._router.navigate(['login']);
    }
  }
}
