import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../../utils/services/library/library.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-user-library-view',
  templateUrl: './user-library-view.component.html',
  styleUrls: ['./user-library-view.component.scss']
})
export class UserLibraryViewComponent implements OnInit {

  constructor(
    private libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.getLibrariesBooks();
  }
  books: any[];

  getLibrariesBooks() {
    this.libraryService.getLibrariesBooks(1).subscribe(data => {
      this.books = data;
    })
  }
}
