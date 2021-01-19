import { map } from 'rxjs/operators';
import { ApiConfig } from '../ApiConfig';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserToken } from '../user_token';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>;
  private apiconfig = new ApiConfig();

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(authData) {
    return this.http.post<any>(this.apiconfig.path + '/api/auth/signin', authData)
      .pipe(map(res => {
        if (res.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.currentUserSubject.next(res);
        }
        return res;
      }))
  }

  register(userData): Observable<any> {
    return this.http.post(this.apiconfig.path + '/api/auth/signup', userData)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  sQUserDefine(sqData) {
    return this.http.post(
      this.apiconfig.path + '/api/auth/sqUser-define', sqData
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  changePassword(data, user_id) {
    return this.http.post(
      this.apiconfig.path + '/api/auth/change-password?user_id=' + user_id,
      data
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

}
