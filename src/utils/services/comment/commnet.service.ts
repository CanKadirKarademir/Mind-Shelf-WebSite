import { Comment } from '../../../app/models/comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommnentService {
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


  getCommnets(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiconfig.path + '/api/admin/allcomments', this.httpOptions)
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
    return this.http.get<any>(
      this.apiconfig.path + '/api/admin/comment/getbyid?comment_id=' + comment_id,
      this.httpOptions
    )
  }

  private getCommentByUser(summary_id, user_id) {
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

  commentStatusUpdate(comment_id, comment_statues) {
    return this.http.post(this.apiconfig.path +
      '/api/admin/update-commentstatus?comment_statues=' + comment_statues + '&comment_id=' + comment_id,
      '',
      this.httpOptions
    )
      .pipe(map((response) => {
        console.log('update status res', response)
      })
      )
  }
}
