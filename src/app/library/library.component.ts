import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/utils/services/book/book.service';
import { Book } from '../module/book';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  book: Book[];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.book = data;
    })
  }

  bookDelete(id) {
    this.bookService.bookDelete(id).subscribe(data => {
      window.location.reload();
    });
  }
}
