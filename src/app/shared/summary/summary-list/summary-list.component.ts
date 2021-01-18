import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/models/summary';
import { SummaryService } from 'src/utils/services/summary/summary.service';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/utils/services/book/book.service';
import { Book } from 'src/app/models/book';
import { DeleteWindowComponent } from '../../../../app/delete-window/delete-window.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.scss']
})


export class SummaryListComponent implements OnInit {
  constructor(
    private _summaryService: SummaryService,
    private _bookService: BookService,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  summary: Summary[];
  book: Book[];
  book_id: number;

  ngOnInit(): void {
    this.getBook();
  }

  onBookSelected(val: any) {
    this.getSummary(val);
  }

  summaryDelete(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Özetinizi silmek ister misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
    this._summaryService.deleteSummary(id).subscribe(data => {
      window.location.reload();
    });
          this._snackBar.open('İşlem başarı ile gerçekleşti', 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
        catch (error) {
          this._snackBar.open('HATA', 'X', {
            duration: 3000,
            panelClass: 'notification__warrning',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        }
      }
    });
  }

  getSummary(book_id) {
    const user_id = JSON.parse(localStorage.getItem('currentUser')).id;
    this._summaryService.getSummaryByUser(book_id, user_id).subscribe(data => {
      this.summary = data;
      console.log(data);
    });
  }

  //user bilgileri icin acılan dialog
  openUserInformation() {
  }

  getBook() {
    this._bookService.getBooks().subscribe(data => {
      this.book = data;
    })
  }
}
