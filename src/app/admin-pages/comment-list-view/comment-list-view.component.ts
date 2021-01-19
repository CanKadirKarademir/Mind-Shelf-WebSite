import { Component, OnInit } from '@angular/core';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.scss']
})
export class CommentListViewComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  user: User[];

  ngOnInit(): void {  
  }
}
