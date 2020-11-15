import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { Summary } from 'src/app/models/summary';
import { User } from 'src/app/module/login';
import { SummaryService } from 'src/utils/services/summary/summary.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UserService } from 'src/utils/services/user/user.service';
import { BookService } from 'src/utils/services/book/book.service';
import { Book } from 'src/app/module/book';

@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.scss']
})


export class SummaryListComponent implements OnInit {

  summary: Summary[];
  book: Book[];
  book_id: number;

  /*summary1=[{
    SummaryID:1,
    SummaryText:"ahmet",
    SummaryIsDeleted: 0
  },
  {
    SummaryID:2,
    SummaryText:"mehmet",
    SummaryIsDeleted: 0
  },
  {
    SummaryID:3,
    SummaryText:"veli",
    SummaryIsDeleted: 0
  }
]*/

  constructor(
    private _summaryService: SummaryService,
    private _bookService: BookService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  onBookSelected(val: any) {
    this.getSummaryByBook(val);
  }

  summaryDelete(id) {
    this._summaryService.deleteSummary(id).subscribe(data => {
      window.location.reload();
    });
  }


  getSummaryByBook(book_id) {
    this._summaryService.getSummaryByBook(book_id).subscribe(data => {
      this.summary = data;
    });
  }

  //user bilgileri icin acılan dialog
  openUserInformation() {
    this.dialog.open(DialogComponent);
  }

  getBook() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    })
  }
}
