import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/module/book';
import { BookService } from 'src/utils/services/book/book.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss']
})
export class SummaryViewComponent implements OnInit {

  constructor(
    private _bookService: BookService
  ) { }

  book: Book[];
  ngOnInit(): void {
    this.getBook();
  }
  getBook() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    });
  }

}
