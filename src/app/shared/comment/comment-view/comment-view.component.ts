import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommnentService } from 'src/utils/services/comment/commnet.service';
import { DeleteWindowComponent } from '../../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit {
  constructor(
    private _commnetService: CommnentService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  commnet: Comment;

  ngOnInit(): void {
    this.getUserAllComments();
  }

  getUserAllComments() {
    this._commnetService.getUserAllComments(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(data => {
      this.commnet = data;
      console.log(this.commnet);
    })
  }

  deleteComment(comment_id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Yorumunuzu silmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
    this._commnetService.commnetDelete(comment_id).subscribe(data => {
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
}
