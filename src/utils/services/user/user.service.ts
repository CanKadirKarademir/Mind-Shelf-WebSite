import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Observable } from 'rxjs';
import { User } from '../../../app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) { }

  public apiconfig = new ApiConfig();
  private token = this._authService.currentUserValue;

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'x-access-token': this.token.accessToken,
      }
    )
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiconfig.path + '/api/admin/allusers', this.httpOptions)
  }

  // tslint:disable-next-line:variable-name
  userGetById(user_id) {
    return this.http.get(this.apiconfig.path + '/api/admin/getbyid?user_id=' + user_id, this.httpOptions)
  }

  // tslint:disable-next-line:variable-name
  userStatusUpdate(user_id, user_status) {
    return this.http.post(this.apiconfig.path +
      '/api/admin/update-status?user_status=' + user_status + '&user_id=' + user_id,
      '',
      this.httpOptions
    )
      .pipe(map((response) => {
        console.log('update status res', response)
      })
      )
  }

  // tslint:disable-next-line:variable-name
  userDelete(user_id) {
    return this.http.post(this.apiconfig.path +
      '/api/admin/user-delete?user_id=' + user_id,
      '',
      this.httpOptions
    )
      .pipe(map((response) => {
        console.log('delete res', response)
      })
      )
  }

  userProfileUpdate(userData, UserId) {
    return this.http.post(
      this.apiconfig.path + '/api/user/profile-edit?user_id=' + UserId,
      userData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
}
