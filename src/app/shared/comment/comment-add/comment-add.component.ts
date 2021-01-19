import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Summary } from 'src/app/models/summary';
import { CommnentService } from 'src/utils/services/comment/commnet.service';
import { SummaryService } from 'src/utils/services/summary/summary.service';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {
  constructor(
    private _alertService: MatSnackBar,
    private _commentService: CommnentService,
    private _activatedRoute: ActivatedRoute,
    private _summaryService: SummaryService,
  ) { }

  user_id: number;
  CommnetID: number;
  SummaryID: number;
  comment: Comment[];
  modelComment: Comment = new Comment();
  modelSummary: Summary = new Summary();

  ngOnInit(): void {
    this.SummaryID = parseInt(this._activatedRoute.snapshot.paramMap.get('SummaryID'));
    this.getSummaryInformation(this.SummaryID);
    this.getByIdSummary(this.SummaryID);
  }

  onSave(commentFrom: NgForm) {
    if (!commentFrom.valid) {
      this._alertService.open(
        'Lütfen Boş Yerleri Doldurunuz !',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      this.onAddComment(commentFrom);
    }
  }
  onAddComment(commentFrom: NgForm) {
    console.log("sadasd", commentFrom)
    this._commentService.commentAdd({
      CommentName: commentFrom.value.CommentName,
      CommentText: commentFrom.value.CommentText,
      SummaryID: this.SummaryID,
      UserID: JSON.parse(localStorage.getItem('currentUser')).id
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
          this._alertService.open(
            'Yorum eklenemedi!',
            'HATA',
            {
              duration: 2000,
            }
          );
        });
    this._alertService.open(
      'Yorum başarılı bir şekilde kayıt edilmiştir :)',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      }
    );
    // window.location.href = "/user/comment/view";
  }

  getSummaryInformation(summary_id) {
    this._summaryService.getSumamryByID(summary_id).subscribe(data => {
      this.modelSummary.SummaryID = data['summaryData'].SummaryID;
      this.modelSummary.SummaryText = data['summaryData'].SummaryText;
      const BookID = data['summaryData'].BookID;
      this.getCommentInformation(BookID);
    });
  }
  getCommentInformation(comment_id) {
    this._commentService.getByIDComment(comment_id).subscribe(comment => {
      this.modelComment = comment;
    });
  }

  getByIdSummary(summary_id) {
    this._commentService.getCommentBySummary(summary_id).subscribe(data => {
      this.comment = data;
    });
  }
}
