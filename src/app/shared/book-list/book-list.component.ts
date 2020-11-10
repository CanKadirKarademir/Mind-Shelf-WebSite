import { Author } from './../../models/author';
import { AuthorService } from './../../../utils/services/author/author.service';
import { MatMenuModule } from '@angular/material/menu';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book'
import { BookService } from '../../../utils/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  book: Book[];
  author: Author[];
  selected = [];
  author_id: number;

  constructor(
    private bookService: BookService,
    private _authorService: AuthorService
  ) { }

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


  bookDelete(id) {
    this.bookService.bookDelete(id).subscribe(data => {
      window.location.reload();
    });
  }

  getAuthorAllBooks(author_id) {
    this.bookService.getAuthorAllBooks(author_id).subscribe(data => {
      this.book = data;
    });
  }
  addBookOnLibrary(book_id) {
    this.bookService.addBookOnLibrary(book_id)
  }
}
