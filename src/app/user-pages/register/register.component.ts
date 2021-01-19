import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { SequrityQuestion } from 'src/app/models/sequrityQuestion';
import { SecurityQuestionsService } from 'src/utils/services/security-questions/security-questions.service';
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
    private _securityQuestionService: SecurityQuestionsService,
  ) { }

  modelUser: User = new User();
  modelSecurityQuestion: SequrityQuestion[];

  ngOnInit() {
    this._securityQuestionService.listSequrityQuestion().subscribe(data => {
      this.modelSecurityQuestion = data;
      console.log("dasdas", data);
    });
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
        UserStatus: 0,
        SecurityQuestionID: registerForm.value.SecurityQuestionID,
        SQAnswersText: registerForm.value.SQAnswersText
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
  onSQSelected(val: any) {
  }
}
