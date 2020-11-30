import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Summary } from 'src/app/models/summary';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/utils/services/book/book.service';
import { SummaryService } from 'src/utils/services/summary/summary.service';

@Component({
  selector: 'app-summary-update',
  templateUrl: './summary-update.component.html',
  styleUrls: ['./summary-update.component.scss']
})
export class SummaryUpdateComponent implements OnInit {

  book_id: number;
  BookID: number;
  SummaryID: number;
  model: Summary = new Summary();
  modelBook: Book = new Book();
  constructor(
    private _summaryService: SummaryService,
    private _alertService: MatSnackBar,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _bookService: BookService,

  ) { }

  ngOnInit(): void {
    this.SummaryID = parseInt(this.activatedRoute.snapshot.paramMap.get('SummaryID'));
    this._summaryService.getSumamryByID(this.SummaryID).subscribe(data => {
      this.model.SummaryID = data['summaryData'].SummaryID;
      this.model.SummaryText = data['summaryData'].SummaryText;
      this.BookID = data['summaryData'].BookID;
      this._bookService.getByIDBook(this.BookID).subscribe(book => {
        this.modelBook = book;
      })
    })
  }

  onSummaryUpdate(summaryForm: NgForm) {
    if (!summaryForm.valid) {
      this._alertService.open(
        'Lütfen Boş Yerleri Doldurunuz !',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      this._summaryService.updateSummary({
        SummaryText: summaryForm.value.SummaryText,
        SummaryIsDeleted: 0,
        UserID: JSON.parse(localStorage.getItem('currentUser')).id
      }, this.SummaryID)
        .pipe(first())
        .subscribe(
          data => {
            console.log('data', data);
            this._router.navigate(['summary']);
          },
          error => {
            console.log('error', error);
          });
      this._alertService.open(
        'Kitap başarılı bir şekilde güncellenmiştir.',
        'İŞLEM BAŞARILI',
        {
          duration: 2000,
        }
      );
      window.location.href = "/user/summaries";
    }
  }
  // getSummarBookInfo() {
  //   this._bookService.getByIDBook(this.BookID).subscribe(data)
  // }
}
