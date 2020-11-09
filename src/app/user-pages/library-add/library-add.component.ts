import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Library } from '../../models/library';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LibraryService } from '../../../utils/services/library/library.service';
import { first } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-library-add',
  templateUrl: './library-add.component.html',
  styleUrls: ['./library-add.component.scss']
})
export class LibraryAddComponent implements OnInit {

  constructor(
    private alertService: MatSnackBar,
    private libraryService: LibraryService
  ) { }
  model: Library = new Library;

  ngOnInit(): void {
  }

  onSave(libraryForm: NgForm) {
    if (!libraryForm.valid) {
      this.alertService.open(
        'Lütfen yazar bilgilerini doldurunuz',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
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
    }

  }

}
