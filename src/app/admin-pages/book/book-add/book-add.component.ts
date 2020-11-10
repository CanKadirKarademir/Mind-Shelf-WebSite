import { Author } from './../../../models/author';
import { AuthorService } from './../../../../utils/services/author/author.service';
import { Book } from '../../../module/book';
import { BookService } from './../../../../utils/services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { convertToParamMap, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';

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
    private _alertService: MatSnackBar
  ) { }
  model: Book = new Book();

  book: Book[];
  author: Author[];
  author_id: number;


  ngOnInit(): void {
    this.getAuthor();
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

  getAllAuthors() {
    this._authorService.listAuthor().subscribe(data => {
      this.author = data;
    });
  }

  onSave(bookForm: NgForm) {
    if (!bookForm.valid) {
      this._alertService.open(
        'Lütfen Boş Yerleri Doldurunuz..!',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      this._alertService.open(
        'Kitap başarılı bir şekilde kayıt edilmiştir :)',
        'BİGİ',
        {
          duration: 2000,
        }
      );
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
      window.location.reload();
    }

  }
}