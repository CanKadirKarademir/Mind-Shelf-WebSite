import { Component, OnInit } from '@angular/core';
import { Library } from '../../models/library';
import { LibraryService } from '../../../utils/services/library/library.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {

  constructor(
    private _libraryService: LibraryService
  ) { }

  ngOnInit(): void {
    this.getLibrary();
  }

  library: Library[];
  // kutuphane: Library = new Library();

  onDeleteLibrary(library_id) {
    this._libraryService.deleteLibrary(library_id).subscribe(data => {
      window.location.reload();
    });
  }

  getLibrary() {
    this._libraryService.listLibrary(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(data => {
      this.library = data;
    })
  }

  saveLibrary() {
    this._libraryService.addlibrary({
      LibraryName: "Kadir Can",
      LibraryIsDeleted: 0,
      UserID: 9,
    }).pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
  }
}
