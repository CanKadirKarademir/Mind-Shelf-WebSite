import { Book } from '../../../app/models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public apiconfig = new ApiConfig();

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
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

  getBooks() {
    return this.http.get<Book[]>(this.apiconfig.path + '/api/admin/all-books', this.httpOptions)
  }

  // tslint:disable-next-line:variable-name
  bookDelete(book_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/delete-book?book_id=' + book_id,
      '',
      this.httpOptions
    )
  }

  getAuthorAllBooks(author_id) {
    return this.http.get<Book[]>(
      this.apiconfig.path + '/api/admin/author/all-books?author_id=' + author_id,
      this.httpOptions
    )
  }

  bookAdd(bookData) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/add-book',
      bookData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  bookUpdate(bookData, book_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/update-book?book_id=' + book_id,
      bookData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  getByIDBook(book_id) {
    return this.http.get<Book>(
      this.apiconfig.path + '/api/admin/book/getbyid?book_id=' + book_id,
      this.httpOptions
    )
  }

  addBookOnLibrary(recordData) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/library/add-book',
      recordData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  deleteBookOnLibrary(book_id) {
    return this.http.post(this.apiconfig.path +
      '/api/admin/library/delete-book?book_id=' + book_id,
      '',
      this.httpOptions
    );
  }
}

