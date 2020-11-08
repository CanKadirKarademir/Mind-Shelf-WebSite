import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';

import { Author } from '../../../app//models/author';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  public apiconfig = new ApiConfig();

  constructor(
    private http: HttpClient,
    private authService: AuthService
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

  updateAuthor() {
    //yazar güncelleme 
  }

  deleteAuthor(author_id) {
    //yazar silme
    return this.http.post(this.apiconfig.path +
      '/api/admin/delete-author?author_id=' + author_id,
      '',
      this.httpOptions
    );
  }

}
