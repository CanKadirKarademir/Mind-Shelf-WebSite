import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityQuestionsService } from 'src/utils/services/security-questions/security-questions.service';
import {
  SequrityQuestion
} from './../../models/sequrityQuestion';
import {
  User
} from './../../models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/utils/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { UserToken } from 'src/utils/services/user_token';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<any>;
  constructor(
    private _securityQuestionService: SecurityQuestionsService,
    private _alertService: MatSnackBar,
    private _router: Router,
    private _authService: AuthService,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('resetUserPassword')));

  }

  modelUser: User = new User();
  modelSecurityQuestion: SequrityQuestion[];
  mSQ_id: number;
  user_id: Number;
  modelCompareUser: User = new User();
  ngOnInit(): void {
    this._securityQuestionService.listSequrityQuestion().subscribe(data => {
      this.modelSecurityQuestion = data;
      console.log("dasdas", data);
    })
  }
  onSave(forgotPassword: NgForm) {
    if (!forgotPassword.valid) {
      this._alertService.open(
        'Lütfen bilgilerinizin doğruluğundan emin olun!',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      this._authService.sQUserDefine({
        UserName: forgotPassword.value.UserName,
        SecurityQuestionID: forgotPassword.value.SecurityQuestionID,
        SQAnswersText: forgotPassword.value.SQAnswersText
      }).subscribe((user: any) => {
        console.log('user', user)
        if (user['Status']) {
          this.user_id = <Number>user.UserID;
          localStorage.setItem('resetUserPassword', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this._alertService.open(
            'Bilgileriniz Doğru Şifrenizi güncelleyebilirsiniz!',
            'ONAY',
            {
              duration: 2000,
            }
          );
          //this._router.navigate(['reset-password/', this.user_id]);
        } else {
          this._alertService.open(
            'Yanliş Bilgeleri Girdiniz Yöneticiniz İle iletişime geçiniz!',
            'HATA',
            {
              duration: 2000,
            }
          );
          return false;
        }
      });
    }
  }
  onSQSelected(val: any) {
  }

}
