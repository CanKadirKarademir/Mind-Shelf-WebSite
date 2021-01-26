import { Component, OnInit } from '@angular/core';
import { Library } from '../../models/library';
import { LibraryService } from '../../../utils/services/library/library.service';
import { first } from 'rxjs/internal/operators/first';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.component.html',
  styleUrls: ['./library-list.component.scss']
})
export class LibraryListComponent implements OnInit {
  constructor(
    private _libraryService: LibraryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _alertService: MatSnackBar,
  ) { }

  library: Library[];
  searchText = "";

  ngOnInit(): void {
    this.getLibrary();
  }

  onDeleteLibrary(library_id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kütüphaneyi silme işlemini onaylıyor musunuz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._libraryService.deleteLibrary(library_id).subscribe(data => {
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
          this._alertService.open(
            'Kütüphane eklenemedi!',
            'HATA',
            {
              duration: 2000,
            })
        });
    this._alertService.open(
      'Kütüphane başarılı bir şekilde eklendi',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      });
  }
}
