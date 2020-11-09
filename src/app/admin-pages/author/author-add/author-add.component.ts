import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author } from '../../../models/author';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthorService } from 'src/utils/services/author/author.service';


@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.scss']
})
export class AuthorAddComponent implements OnInit {

  constructor(
    private router: Router,
    private authorService: AuthorService,
    private alertService: MatSnackBar,
  ) { }
  model: Author = new Author();

  ngOnInit(): void {
  }

  onSave(authorForm: NgForm) {
    if (!authorForm.valid) {
      this.alertService.open(
        'Lütfen yazar bilgilerini doldurunuz',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      this.authorService.addAuthor({
        AuthorFirstName: authorForm.value.AuthorName,
        AuthorLastName: authorForm.value.AuthorLastName,
        AuthorIsDeleted: 0
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
        'Yazar başarılı bir şekilde eklendi',
        'İŞLEM BAŞARILI',
        {
          duration: 2000,
        })
    }

  }
}
