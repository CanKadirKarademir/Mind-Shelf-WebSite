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
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private _securityQuestionService: SecurityQuestionsService,
    private _alertService: MatSnackBar,
    private _router: Router
  ) { }

  modelUser: User = new User();
  modelSecurityQuestion: SequrityQuestion[];

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
        'Kullancı adı veya şifre boş bırakılamaz!',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
     // this.modelCompareUser = this._securityQuestionService.getUserInfo({ UserName: forgotPassword.value.UserName });

    }
    this._securityQuestionService.securtyUpdatePass({
      UserName: forgotPassword.value.UserName,
      UserPassword: "123456"
    });
    this._alertService.open(
      'Şifreniz 123456 olarak oluşturuldu Şifrenizi güncelleyiniz!',
      'HATA',
      {
        duration: 2000,
      }
    );
    this._router.navigate(['/login']);
  }
  onSQSelected(val: any) {

  }

}
