import { AuthorService } from './../../../../utils/services/author/author.service';
import { BookService } from './../../../../utils/services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/module/book';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-admin-book-update',
  templateUrl: './admin-book-update.component.html',
  styleUrls: ['./admin-book-update.component.scss']
})
export class AdminBookUpdateComponent implements OnInit {
  book: Book[];
  author: Author[];
  constructor(
    private _bookService: BookService,
    private _authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.getAllAuthors();
  }

  getAllAuthors() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    });
  }

  getAllBooks() {
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