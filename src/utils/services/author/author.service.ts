import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Author } from '../../../app//models/author';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  public apiconfig = new ApiConfig();

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) { }

  private token = this._authService.currentUserValue;

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'x-access-token': this.token.accessToken,
      }
    )
  };
  addAuthor(authorData) {
    //yazar eklenecek
    return this.http.post(
      this.apiconfig.path + '/api/admin/add-author',
      authorData,
      this.httpOptions
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  listAuthor() {
    //yazar listeleme
    return this.http.get<Author[]>(
      this.apiconfig.path + '/api/admin/all-authors',
      this.httpOptions
    );

  }

  updateAuthor(authorData, author_id) {
    //yazar güncelleme
    return this.http.post(
      this.apiconfig.path + '/api/admin/update-author?author_id=' + author_id,
      authorData,
      this.httpOptions
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  deleteAuthor(author_id) {
    //yazar silme
    return this.http.post(
      this.apiconfig.path + '/api/admin/delete-author?author_id=' + author_id,
      '',
      this.httpOptions
    );
  }
  getByIdAuthor(author_id) {
    return this.http.get<Author>(
      this.apiconfig.path + '/api/admin/author/getbyid?author_id=' + author_id,
      this.httpOptions
    );
  }

}
