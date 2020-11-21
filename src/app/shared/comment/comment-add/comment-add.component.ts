  import { Component, OnInit } from '@angular/core';
  import { NgForm } from '@angular/forms';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { ActivatedRoute, Router } from '@angular/router';
  import { first } from 'rxjs/operators';
  import { CommnentService } from 'src/utils/services/comment/commnet.service';
  import {Comment} from '../../../models/comment';

  @Component({
    selector: 'app-comment-add',
    templateUrl: './comment-add.component.html',
    styleUrls: ['./comment-add.component.scss']
  })
  export class CommentAddComponent implements OnInit {

    user_id: number;
    CommnetID:number;
    modelComment: Comment = new Comment();
    SummaryID: number;

    constructor(
      private _router: Router,
      private _alertService: MatSnackBar,
      private _commentservice: CommnentService,
      private activatedRoute: ActivatedRoute,

    ) { }

    ngOnInit(): void {
      this.SummaryID = parseInt(this.activatedRoute.snapshot.paramMap.get('SummaryID'));

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
      this._commentservice.commentAdd({
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
          });
      this._alertService.open(
        'Yorum başarılı bir şekilde kayıt edilmiştir :)',
        'İŞLEM BAŞARILI',
        {
          duration: 2000,
        }
      );
      window.location.reload();
    }
  }
