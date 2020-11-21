import { Comment } from '../../../app/models/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommnentService {

  public apiconfig = new ApiConfig();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  token = this.authService.currentUserValue;

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'x-access-token': this.token.accessToken,
      }
    )
  };

  getCommnets() {
    return this.http.get<Comment[]>(this.apiconfig.path + '/api/admin/all-comments', this.httpOptions)
  }

  // tslint:disable-next-line:variable-name
  commnetDelete(comment_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/delete-comment?comment_id=' + comment_id,
      '',
      this.httpOptions
    )
  }


  getUserAllComments(user_id) {
    return this.http.get<Comment[]>(
      this.apiconfig.path + '/api/admin/user/all-comments?user_id=' + user_id,
      this.httpOptions
    )
  }

  commentAdd(commentData) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/add-comment',
      commentData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  commentUpdate(commentData, comment_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/update-comment?comment_id=' + comment_id,
      commentData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }
  getByIDComment(comment_id) {
    return this.http.get<Comment>(
      this.apiconfig.path + '/api/admin/comment/getbyid?comment_id=' + comment_id,
      this.httpOptions
    )
  }
  getCommentByUser(summary_id, user_id) {
    return this.http.get<Comment[]>(
      this.apiconfig.path + '/api/admin/getbyUser-summary?user_id=' + user_id + '&book_id=' + summary_id,
      this.httpOptions
    );
  }

  getCommentBySummary(summary_id) {
    return this.http.get<Comment[]>(
      this.apiconfig.path + '/api/admin/getBySummary-comments?summary_id=' + summary_id,
      this.httpOptions
    );
  }
}
