import { Component, OnInit } from '@angular/core';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from '../../models/comment';
import { CommnentService } from '../../../utils/services/comment/commnet.service';

@Component({
  selector: 'app-comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.scss']
})
export class CommentListViewComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _commentService: CommnentService,

  ) { }

  comment: Comment[];
  searchText = "";

  ngOnInit(): void {
    this.getAllCommnets();
  }

  getAllCommnets() {
    this._commentService.getCommnets().subscribe(data => {
      this.comment = data;
    })
  }

  commentStatusUpdate(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Yorumu aktifleştirmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._commentService.commentStatusUpdate(id, 1).subscribe(data => {
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

  commentDelete(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kullanıcıyı silmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._commentService.commnetDelete(id).subscribe(data => {
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
