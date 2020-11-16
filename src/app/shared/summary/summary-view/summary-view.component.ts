import { Component, OnInit } from '@angular/core';
import { Summary } from '../../../models/summary';
import { Book } from '../../../models/book';
import { BookService } from 'src/utils/services/book/book.service';
import { SummaryService } from '../../../../utils/services/summary/summary.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.scss']
})
export class SummaryViewComponent implements OnInit {

  constructor(
    private _bookService: BookService,
    private _summaryService: SummaryService
  ) { }
  book_id: number;
  book: Book[];
  summaries: Summary[];

  ngOnInit(): void {
    this.getBook();
  }
  getBook() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    });
  }
  getSummaries() {
    this._summaryService.getSummaryByBook(this.book_id).subscribe(data => {
      this.summaries = data;
    })
  }

}
