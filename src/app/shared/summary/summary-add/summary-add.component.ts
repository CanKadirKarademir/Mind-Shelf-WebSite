import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Summary } from 'src/app/models/summary';
import { Book } from 'src/app/module/book';
import { BookService } from 'src/utils/services/book/book.service';
import { SummaryService } from 'src/utils/services/summary/summary.service';

@Component({
  selector: 'app-summary-add',
  templateUrl: './summary-add.component.html',
  styleUrls: ['./summary-add.component.scss']
})
export class SummaryAddComponent implements OnInit {

  modelSummary: Summary = new Summary();
  modelBook: Book = new Book();
  book_id: number;
  BookID: number;

  constructor(
    private _summaryService: SummaryService,
    private _bookService: BookService,
    private _alertService: MatSnackBar,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }


  ngOnInit(): void {
    this.getBook();
    this.BookID = parseInt(this.activatedRoute.snapshot.paramMap.get('BookID'));

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
        });
    this._alertService.open(
      'Özet başarılı bir şekilde kayıt edilmiştir :)',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
  }
  getBook() {
    this._bookService.getByIDBook(this.BookID).subscribe(data => {
      this.modelBook = data;
    })
  }

  /*
  onUpdateSummary(summaryForm: NgForm) {
    this._summaryService.updateSummary({
      SummaryText: summaryForm.value.SummaryText,
      SummaryIsDeleted: 0,
      BookID: this.book_id,
      UserID: 16
    }, this.SummaryID)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this._alertService.open(
      'Özet başarılı bir şekilde güncellenmiştir.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
    this._router.navigateByUrl('user');
  }*/

}
