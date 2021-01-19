import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/utils/services/book/book.service';
import { LibraryService } from '../../../utils/services/library/library.service';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-library-view',
  templateUrl: './user-library-view.component.html',
  styleUrls: ['./user-library-view.component.scss']
})
export class UserLibraryViewComponent implements OnInit {
  constructor(
    private _libraryService: LibraryService,
    private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  LibraryID: number;

  ngOnInit(): void {
    this.getLibrariesBooks(this.LibraryID);
    this.LibraryID = parseInt(this._activatedRoute.snapshot.paramMap.get('LibraryID'));
    Number.isNaN(this.LibraryID) ? this._router.navigateByUrl('user') : this.getLibrariesBooks(this.LibraryID);
  }

  books: any[];

  getLibrariesBooks(library_id) {
    this._libraryService.getLibrariesBooks(library_id).subscribe(data => {
      this.books = data;
    })
  }

  deleteBookOnLibrary(book_id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kütüphanenizden kitabı çıkarmak ister misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._bookService.deleteBookOnLibrary(book_id).subscribe(data => {
            window.location.reload();
          });
          this._snackBar.open('İşlem başarı ile gerçekleşti', 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
        catch (error) {
          this._snackBar.open('HATA', 'X', {
            duration: 3000,
            panelClass: 'notification__warrning',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
      }
    })
  }
}
