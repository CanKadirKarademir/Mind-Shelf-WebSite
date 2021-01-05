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
  constructor(
    private _summaryService: SummaryService,
    private _commentService: CommnentService,
    private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  modelSummary: Summary = new Summary();
  modelBook: Book = new Book();
  comment: Comment[];

  ngOnInit() {
    const SummaryID = parseInt(this._activatedRoute.snapshot.paramMap.get('SummaryID'));
    this.getSummaryInformation(SummaryID);
    this.getByIdSummary(SummaryID);
  }

  getSummaryInformation(summary_id) {
    this._summaryService.getSumamryByID(summary_id).subscribe(data => {
      this.modelSummary.SummaryID = data['summaryData'].SummaryID;
      this.modelSummary.SummaryText = data['summaryData'].SummaryText;
      const BookID = data['summaryData'].BookID;
      this.getBookInformation(BookID);
    });
  }

  getBookInformation(book_id) {
    this._bookService.getByIDBook(book_id).subscribe(book => {
      this.modelBook = book;
    });
  }

  getByIdSummary(summary_id) {
    this._commentService.getCommentBySummary(summary_id).subscribe(data => {
      this.comment = data;
    });
  }
}
