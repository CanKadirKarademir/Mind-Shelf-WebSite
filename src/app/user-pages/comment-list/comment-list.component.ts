import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { Summary } from 'src/app/models/summary';
import { SummaryService } from 'src/utils/services/summary/summary.service';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/utils/services/book/book.service';
import { CommnentService } from 'src/utils/services/comment/commnet.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  summary: Summary = new Summary();
  comment: Comment[];
  modelBook: Book = new Book();
  SummaryID: number;
  BookID: Number;
  constructor(
    private _summaryService: SummaryService,
    private _commentService: CommnentService,
    private _bookService: BookService,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.SummaryID = parseInt(this.activatedRoute.snapshot.paramMap.get('SummaryID'));
    this._summaryService.getSumamryByID(this.SummaryID).subscribe(data => {
      this.summary.SummaryID = data['summaryData'].SummaryID;
      this.summary.SummaryText = data['summaryData'].SummaryText;
      this.BookID = data['summaryData'].BookID;
      this._bookService.getByIDBook(this.BookID).subscribe(book => {
        this.modelBook = book;
      })
    });
    this.getByIdSummary();
  }

  getByIdSummary() {
    this._commentService.getCommentBySummary(this.SummaryID).subscribe(data => {
      this.comment = data;
      console.log("kadir"
      ,data);
    })
  }
}
