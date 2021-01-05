import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/utils/services/book/book.service';
import { LibraryService } from '../../../utils/services/library/library.service';

@Component({
  selector: 'app-user-library-view',
  templateUrl: './user-library-view.component.html',
  styleUrls: ['./user-library-view.component.scss']
})
export class UserLibraryViewComponent implements OnInit {
  constructor(
    private _libraryService: LibraryService,
    private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  LibraryID: number;

  ngOnInit(): void {
    this.getLibrariesBooks(this.LibraryID);
    this.LibraryID = parseInt(this._activatedRoute.snapshot.paramMap.get('LibraryID'));
    Number.isNaN(this.LibraryID) ? this._router.navigateByUrl('user') : this.getLibrariesBooks(this.LibraryID);
  }

  books: any[];

  getLibrariesBooks(library_id) {
    this._libraryService.getLibrariesBooks(library_id).subscribe(data => {
      this.books = data;
    })
  }

  deleteBookOnLibrary(book_id) {
    this._bookService.deleteBookOnLibrary(book_id).subscribe(data => {
      window.location.reload();
    })
  }
}
