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
    private alertService: MatSnackBar,
    private libraryService: LibraryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  model: Library = new Library;
  LibraryId: number = null;

  ngOnInit(): void {
    this.LibraryId = parseInt(this.activatedRoute.snapshot.paramMap.get('LibraryID'));
    this.libraryService.getByIdLibrary(this.LibraryId).subscribe(data => {
      this.model = data;
    });
  }

  onSave(libraryForm: NgForm) {
    if (!libraryForm.valid) {
      this.alertService.open(
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
    this.libraryService.addlibrary({
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
    this.alertService.open(
      'Kütüphane başarılı bir şekilde eklendi',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      })
    this.router.navigateByUrl('user');
  }
  onUpdateLibrary(lKibraryForm: NgForm) {
    console.log(lKibraryForm.value)
    this.libraryService.updateLibrary({
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
    this.alertService.open(
      'Kütüphane Güncellendi.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      })
    this.router.navigateByUrl('user');
    window.location.href = "/user/libraries";
  }
}
