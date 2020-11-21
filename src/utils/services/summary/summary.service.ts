import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Summary } from '../../../app/models/summary';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
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

  addSummary(summaryData) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/add-summary',
      summaryData,
      this.httpOptions
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  updateSummary(summaryData, summary_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/update-summary?summary_id=' + summary_id,
      summaryData,
      this.httpOptions
    ).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }

  deleteSummary(summary_id) {
    return this.http.post(
      this.apiconfig.path + '/api/admin/delete-summary?summary_id=' + summary_id,
      '',
      this.httpOptions
    );
  }

  getSummaryByUser(book_id, user_id) {
    return this.http.get<Summary[]>(
      this.apiconfig.path + '/api/admin/getbyUser-summary?user_id=' + user_id + '&book_id=' + book_id,
      this.httpOptions
    );
  }

  getSummaryByBook(book_id) {
    return this.http.get<Summary[]>(
      this.apiconfig.path + '/api/admin/getbyBook-summary?book_id=' + book_id,
      this.httpOptions
    );
  }

  getSumamryByID(summary_id) {
    return this.http.get<any>(
      this.apiconfig.path + '/api/admin/comment/getbyid?summary_id=' + summary_id,
      this.httpOptions
    );
  }

  getSummaries() {
    return this.http.get<Summary[]>(this.apiconfig.path + '/api/admin/all-summaryies', this.httpOptions)
  }
}
