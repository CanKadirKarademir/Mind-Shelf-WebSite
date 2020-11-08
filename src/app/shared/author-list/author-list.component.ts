import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../../utils/services/author/author.service';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  constructor(
    private _authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.getAuthor();
  }

  author: Author[];
  yazar: Author = new Author();

  onDeleteAuthor(author_id) {
    this._authorService.deleteAuthor(author_id).subscribe(data => {
      window.location.reload();
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
