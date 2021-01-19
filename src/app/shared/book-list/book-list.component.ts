import { Author } from './../../models/author';
import { AuthorService } from './../../../utils/services/author/author.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../../utils/services/book/book.service';
import { first } from 'rxjs/internal/operators/first';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibraryService } from '../../../utils/services/library/library.service';
import { Library } from './../../models/library';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})

export class BookListComponent implements OnInit {
  constructor(
    private _bookService: BookService,
    private _authorService: AuthorService,
    private _alertService: MatSnackBar,
    private _libraryService: LibraryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  book: Book[];
  author: Author[];
  selected = [];
  author_id: number;
  library_id: number;
  library: Library[];

  ngOnInit(): void {
    this.getAuthor();
    this.getLibraries();
  }

  onAuthorSelected(val: any) {
    this.getAuthorAllBooks(val);
  }

  getAuthor() {
    this._authorService.listAuthor().subscribe(data => {
      this.author = data;
    });
  }

  getAuthorAllBooks(author_id) {
    this._bookService.getAuthorAllBooks(author_id).subscribe(data => {
      this.book = data;
    });
  }

  onLibrarySelected(val: any) {
    this.getAllLibraries(val);
  }

  getAllLibraries(library_id) {
    this._libraryService.getByIdLibrary(library_id).subscribe(data => {

    });
  }

  getLibraries() {
    this._libraryService.listLibrary(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(data => {
      this.library = data;
    })
  }

  bookDelete(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kitabı silmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._bookService.bookDelete(id).subscribe(data => {
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
    });
  }

  addBookOnLibrary(book_id) {
    console.log(book_id)
    this._bookService.addBookOnLibrary({
      LibraryID: this.library_id,
      BookID: book_id
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
          this._alertService.open(
            'Kitap kütüphanenize eklenemedi!',
            'HATA',
            {
              duration: 2000,
            }
          );
        });
    this._alertService.open(
      'Kitap kütüphanenize eklenmiştir.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
  }
}
