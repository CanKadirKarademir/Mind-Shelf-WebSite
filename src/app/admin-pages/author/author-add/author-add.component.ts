import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Author } from '../../../models/author';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) { }
  model: Author = new Author();

  AuthorID: number;

  ngOnInit(): void {
    this.AuthorID = parseInt(this.activatedRoute.snapshot.paramMap.get('AuthorID'));
    this.authorService.getByIdAuthor(this.AuthorID).subscribe(data => {
      this.model = data;
    })

  }

  onSave(authorForm: NgForm) {
    if (!authorForm.valid) {
      this.alertService.open(
        'Lütfen yazar bilgilerini kontrolediniz',
        'HATA',
        {
          duration: 2000,
        }
      );
    } else {
      Number.isNaN(this.AuthorID) ? this.onAddAuthor(authorForm) : this.onUpdateAuthor(authorForm);
    }
  }
  onAddAuthor(authorForm: NgForm) {
    this.authorService.addAuthor({
      AuthorFirstName: authorForm.value.AuthorFirstName,
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
    window.location.reload();
  }
  onUpdateAuthor(authorForm: NgForm) {
    this.authorService.updateAuthor({
      AuthorFirstName: authorForm.value.AuthorFirstName,
      AuthorLastName: authorForm.value.AuthorLastName,
      AuthorIsDeleted: 0
    }, this.AuthorID)
      .pipe(first())
      .subscribe(
        data => {
          console.log('data', data);
        },
        error => {
          console.log('error', error);
        });
    this.alertService.open(
      'Yazar başarılı bir güncellenmiştir.',
      'İŞLEM BAŞARILI',
      {
        duration: 2000,
      })
    this.router.navigateByUrl('user');
  }
}
