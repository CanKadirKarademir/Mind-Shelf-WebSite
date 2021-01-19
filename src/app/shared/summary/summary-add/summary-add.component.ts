import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Summary } from 'src/app/models/summary';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/utils/services/book/book.service';
import { SummaryService } from 'src/utils/services/summary/summary.service';

@Component({
  selector: 'app-summary-add',
  templateUrl: './summary-add.component.html',
  styleUrls: ['./summary-add.component.scss']
})
export class SummaryAddComponent implements OnInit {
  constructor(
    private _summaryService: SummaryService,
    private _bookService: BookService,
    private _alertService: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
  ) { }

  modelSummary: Summary = new Summary();
  modelBook: Book = new Book();
  BookID: number;

  ngOnInit(): void {
    this.getBook();
    this.BookID = parseInt(this._activatedRoute.snapshot.paramMap.get('BookID'));
    this._bookService.getByIDBook(this.BookID).subscribe(book => {
      this.modelBook = book;
    })
  }

  onSave(summaryForm: NgForm) {
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
      this.onAddSummary(summaryForm);
    }
  }
  onAddSummary(summaryForm: NgForm) {
    this._summaryService.addSummary({
      SummaryText: summaryForm.value.SummaryText,
      SummaryIsDeleted: 0,
      BookID: this.BookID,
      UserID: JSON.parse(localStorage.getItem('currentUser')).id
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
          this._alertService.open(
            'Özet bilgileri kayıt edilemedi!',
            'HATA',
            {
              duration: 2000,
            }
          );
        });
    this._alertService.open(
      'Özet başarılı bir şekilde kayıt edilmiştir :)',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
    window.location.href = "/user/summaries";
  }

  getBook() {
    this._bookService.getByIDBook(this.BookID).subscribe(data => {
      this.modelBook = data;
    })
  }
}
