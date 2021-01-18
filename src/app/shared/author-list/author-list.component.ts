import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../../utils/services/author/author.service';
import { first } from 'rxjs/internal/operators/first';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  constructor(
    private _authorService: AuthorService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  author: Author[];

  ngOnInit(): void {
    this.getAuthor();
  }

  onDeleteAuthor(author_id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Yazar bilgisini silmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
    this._authorService.deleteAuthor(author_id).subscribe(data => {
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

  getAuthor() {
    this._authorService.listAuthor().subscribe(data => {
      this.author = data;
    })
  }
  saveAuthor() {
    this._authorService.addAuthor({
      AuthorFirstName: "Kadir Can",
      AuthorIsDeleted: 0,
      AuthorLastName: "KARADEMİR"
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
