import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommnentService } from 'src/utils/services/comment/commnet.service';
import { SummaryService } from 'src/utils/services/summary/summary.service';
import { Comment } from '../../../models/comment';
import { Summary } from '../../../models/summary';


@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.scss']
})
export class CommentUpdateComponent implements OnInit {

  CommentID: number;
  modelComment: Comment = new Comment();
  modelSummary: Summary = new Summary();

  constructor(
    private _commentService: CommnentService,
    private _summaryService: SummaryService,
    private _alertService: MatSnackBar,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.CommentID = parseInt(this.activatedRoute.snapshot.paramMap.get('CommentID'));
    this._commentService.getByIDComment(this.CommentID).subscribe(data => {
      this.modelComment = data;
      console.log(data);
      console.log("uloo", data.SummaryID)
      this._summaryService.getSumamryByID(data.SummaryID).subscribe(summary => {
        this.modelSummary = summary['summaryData'];
        console.log(this.modelSummary.SummaryText);
      })
    })
  }


  onCommentUpdate(summaryForm: NgForm) {
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
      this._commentService.commentUpdate({
        CommentName: summaryForm.value.CommentName,
        CommentText: summaryForm.value.CommentText,
        UserID: JSON.parse(localStorage.getItem('currentUser')).id
      }, this.CommentID)
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
        'Yorum başarılı bir şekilde kayıt edilmiştir :)',
        'İŞLEM BAŞARILI',
        {
          duration: 2000,
        }
      );
      window.location.href = "/user/comment/view";
    }
  }
}
