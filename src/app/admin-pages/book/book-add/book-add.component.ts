import { Author } from './../../../models/author';
import { AuthorService } from './../../../../utils/services/author/author.service';
import { Book } from '../../../models/book';
import { BookService } from './../../../../utils/services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {
  constructor(
    private _router: Router,
    private _bookService: BookService,
    private _authorService: AuthorService,
    private _alertService: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
  ) { }

  modelBook: Book = new Book();
  book: Book[];
  author: Author[];
  author_id: number;
  BookID: number;

  ngOnInit(): void {
    this.getAuthor();
    this.BookID = parseInt(this._activatedRoute.snapshot.paramMap.get('BookID'));
    this._bookService.getByIDBook(this.BookID).subscribe(data => {
      this.modelBook = data;
      console.log(this.modelBook);

    });
    console.log("ulooo", this.BookID);
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

  onSave(bookForm: NgForm) {
    if (!bookForm.valid) {
      this._alertService.open(
        'Lütfen Bilgilerin doğru olduğundan emin olun !',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      Number.isNaN(this.BookID) ? this.onAddBook(bookForm) : this.onUpdateBook(bookForm);
    }
  }

  onAddBook(bookForm: NgForm) {
    this._bookService.bookAdd({
      BookName: bookForm.value.BookName,
      BookType: bookForm.value.BookType,
      BookPage: bookForm.value.BookPage,
      Publisher: bookForm.value.Publisher,
      PublicationYear: bookForm.value.PublicationYear,
      BookIsDeleted: 0,
      AuthorID: this.author_id
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this._alertService.open(
      'Kitap başarılı bir şekilde kayıt edilmiştir :)',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
    this._router.navigateByUrl('user/books');
  }

  onUpdateBook(bookForm: NgForm) {
    this._bookService.bookUpdate({
      BookName: bookForm.value.BookName,
      BookType: bookForm.value.BookType,
      BookPage: bookForm.value.BookPage,
      Publisher: bookForm.value.Publisher,
      PublicationYear: bookForm.value.PublicationYear,
      BookIsDeleted: 0,
      AuthorID: this.author_id
    }, this.BookID)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this._alertService.open(
      'Kitap başarılı bir şekilde güncellenmiştir.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
    this._router.navigateByUrl('user/books');
  }
}
