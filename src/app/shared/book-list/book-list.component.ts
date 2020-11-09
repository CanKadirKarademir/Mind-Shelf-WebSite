import { AuthorService } from './../../../utils/services/author/author.service';
import { MatMenuModule } from '@angular/material/menu';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../module/book'
import { BookService } from '../../../utils/services/book/book.service';
import { Author } from 'src/app/models/author';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  book: Book[];
  author: Author[];
  select:Number;

  constructor(
    private _bookService: BookService,
    private _authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
    this.author = [];
    this.select=3
  }

  getAllBooks() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    });
  }

  getAllAuthors() {
    this._authorService.listAuthor().subscribe(data => {
      this.author = data;
    });
  }

  bookDelete(id) {
    this._bookService.bookDelete(id).subscribe(data => {
      window.location.reload();
    });
  }
}
