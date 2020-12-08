import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Library } from '../../../app/models/library';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  constructor(
    private http: HttpClient,
    private _authService: AuthService,
  ) { }

  private token = this._authService.currentUserValue;
  public apiconfig = new ApiConfig();

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'x-access-token': this.token.accessToken,
      }
    )
  };

  addlibrary(libraryData) {
    //kütüphane eklenecek
    return this.http.post(
      this.apiconfig.path + '/api/admin/add-library',
      libraryData,
      this.httpOptions
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  listLibrary(user_id) {
    //kütüphane listeleme
    return this.http.get<Library[]>(
      this.apiconfig.path + '/api/admin/all-libraries?user_id=' + user_id,
      this.httpOptions
    );
  }

  deleteLibrary(library_id) {
    //yazar silme
    return this.http.post(this.apiconfig.path +
      '/api/admin/delete-library?library_id=' + library_id,
      '',
      this.httpOptions
    );
  }

  getLibrariesBooks(library_id) {
    //kütüphanedeki kitapları listeleme
    return this.http.get<any[]>(
      this.apiconfig.path + '/api/admin/library/all-books?library_id=' + library_id,
      this.httpOptions
    );
  }

  updateLibrary(libraryData, library_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/update-library?library_id=' + library_id,
      libraryData,
      this.httpOptions)
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  getByIdLibrary(library_id) {
    return this.http.get<Library>(
      this.apiconfig.path + '/api/admin/library/getbyid?library_id=' + library_id,
      this.httpOptions
    )
  }
}
