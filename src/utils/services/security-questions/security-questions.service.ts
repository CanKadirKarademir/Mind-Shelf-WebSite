import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { map } from 'rxjs/operators';
import {
  SequrityQuestion
} from '../../../app/models/sequrityQuestion';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionsService {

  constructor(
    private http: HttpClient
  ) { }

  public apiconfig = new ApiConfig();

  //get one questions
  listOneSecurityQuestion(securityQuestion_id) {
    return this.http.get<SequrityQuestion>(
      this.apiconfig.path + '/api/getOne-securityQuestions?securityQuestion_id=' + securityQuestion_id
    );
  }
  //get all questions
  listSequrityQuestion() {
    return this.http.get<SequrityQuestion[]>(
      this.apiconfig.path + '/api/admin/getAll-securityQuestions'
    );
  }
  securtyUpdatePass(userData) {
    return this.http.post(
      this.apiconfig.path + '/api/user/password-update',
      userData
    );
  }
  getUserInfo(userData) {
    return this.http.get<User[]>(
      this.apiconfig.path + '/api/user/getbyUserName',
      userData
    );
  }
}
