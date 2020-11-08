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
  ) { }
  model: Book = new Book();

  book: Book[];

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    })
  }

  onSave(bookForm: NgForm) {
    this._bookService.bookAdd({
      BookName: bookForm.value.BookName,
      BookType: bookForm.value.BookType,
      BookPage: bookForm.value.BookPage,
      Publisher: bookForm.value.Publisher,
      PublicationYear: bookForm.value.PublicationYear,
      BookIsDeleted: 0,
      AuthorID: 3
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
  }
}