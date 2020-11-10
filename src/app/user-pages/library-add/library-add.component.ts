import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Library } from '../../models/library';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibraryService } from '../../../utils/services/library/library.service';
import { first } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
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
  LibraryID: number;

  ngOnInit(): void {
    this.LibraryID = parseInt(this.activatedRoute.snapshot.paramMap.get('LibraryID'));
    this.libraryService.getByIdLibrary(this.LibraryID).subscribe(data => {
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
    } else {
      if (this.LibraryID != null) {
        this.onUpdateLibrary(libraryForm);
      }
      else {
        this.onAddLibrary(libraryForm);
      }
    }

  }
  onAddLibrary(libraryForm: NgForm) {
    this.libraryService.addlibrary({
      LibraryName: libraryForm.value.LibraryName,
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
  onUpdateLibrary(libraryForm: NgForm) {
    this.libraryService.updateLibrary({
      LibraryName: libraryForm.value.LibraryName,
      LibraryIsDeleted: 0,
    }, this.LibraryID)
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
  }
}
