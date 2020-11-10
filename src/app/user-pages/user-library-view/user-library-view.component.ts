import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../../../utils/services/library/library.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-user-library-view',
  templateUrl: './user-library-view.component.html',
  styleUrls: ['./user-library-view.component.scss']
})
export class UserLibraryViewComponent implements OnInit {

  constructor(
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  LibraryID: number;

  ngOnInit(): void {
    this.getLibrariesBooks(this.LibraryID);
    this.LibraryID = parseInt(this.activatedRoute.snapshot.paramMap.get('LibraryID'));
    Number.isNaN(this.LibraryID) ? this.router.navigateByUrl('user') : this.getLibrariesBooks(this.LibraryID);
  }
  books: any[];


  getLibrariesBooks(library_id) {
    this.libraryService.getLibrariesBooks(library_id).subscribe(data => {
      this.books = data;
    })
  }
}
