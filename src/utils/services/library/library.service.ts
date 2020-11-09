import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ApiConfig } from '../ApiConfig';
import { Library } from '../../../app/models/library';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    public apiconfig = new ApiConfig();

    constructor(
        private http: HttpClient,
        private alertService: MatSnackBar,
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
}    