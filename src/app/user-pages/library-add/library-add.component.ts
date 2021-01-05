import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Library } from '../../models/library';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibraryService } from '../../../utils/services/library/library.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-library-add',
  templateUrl: './library-add.component.html',
  styleUrls: ['./library-add.component.scss']
})
export class LibraryAddComponent implements OnInit {
  constructor(
    private _alertService: MatSnackBar,
    private _libraryService: LibraryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  modelLibrary: Library = new Library;
  LibraryId: number = null;

  ngOnInit(): void {
    this.LibraryId = parseInt(this._activatedRoute.snapshot.paramMap.get('LibraryID'));
    this._libraryService.getByIdLibrary(this.LibraryId).subscribe(data => {
      this.modelLibrary = data;
    });
  }

  onSave(libraryForm: NgForm) {
    if (!libraryForm.valid) {
      this._alertService.open(
        'Lütfen Bilgilerin doğru olduğundan emin olun !',
        'HATA',
        {
          duration: 2000,
        }
      );
    }
    else {
      Number.isNaN(this.LibraryId) ? this.onAddLibrary(libraryForm) : this.onUpdateLibrary(libraryForm);
    }

  }

  onAddLibrary(lKibraryForm: NgForm) {
    this._libraryService.addlibrary({
      LibraryName: lKibraryForm.value.LibraryName,
      LibraryIsDeleted: 0,
      UserID: JSON.parse(localStorage.getItem('currentUser')).id
    })
      .pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this._alertService.open(
      'Kütüphane başarılı bir şekilde eklendi',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      })
    this._router.navigateByUrl('user');
  }

  onUpdateLibrary(lKibraryForm: NgForm) {
    console.log(lKibraryForm.value)
    this._libraryService.updateLibrary({
      LibraryName: lKibraryForm.value.LibraryName,
      LibraryIsDeleted: 0,
    }, this.LibraryId)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this._alertService.open(
      'Kütüphane Güncellendi.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      })
    this._router.navigateByUrl('user/libraries');
  }
}
