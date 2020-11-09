import { Author } from './../../models/author';
import { AuthorService } from './../../../utils/services/author/author.service';
import { MatMenuModule } from '@angular/material/menu';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book'
import { BookService } from '../../../utils/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  book: Book[];
  author: Author[];
  selected = [];

  constructor(
    private bookService: BookService,
    private _authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAuthor();
  }


  getAllBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.book = data;
    });
  }

  getAuthor() {
    this._authorService.listAuthor().subscribe(data => {
      this.author = data;
    });
  }


  bookDelete(id) {
    this.bookService.bookDelete(id).subscribe(data => {
      window.location.reload();
    });
  }

  getAuthorAllBooks() {
    this.bookService.getAuthorAllBooks().subscribe(data => {
      //window.location.reload();
    });
  }
}
