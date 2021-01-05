import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment';
import { CommnentService } from 'src/utils/services/comment/commnet.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit {
  constructor(
    private _commnetService: CommnentService,
  ) { }

  commnet: Comment[];

  ngOnInit(): void {
    this.getUserAllComments();
  }

  getUserAllComments() {
    this._commnetService.getUserAllComments(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(data => {
      this.commnet = data;
    })
  }

  deleteComment(comment_id) {
    this._commnetService.commnetDelete(comment_id).subscribe(data => {
      window.location.reload();
    });
  }
}
