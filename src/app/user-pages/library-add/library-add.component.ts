import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {NgForm} from '@angular/forms';
import { Library} from '../../models/library';

@Component({
  selector: 'app-library-add',
  templateUrl: './library-add.component.html',
  styleUrls: ['./library-add.component.scss']
})
export class LibraryAddComponent implements OnInit {

  constructor() { }
  model: Library=new Library;

  ngOnInit(): void {
  }

  onSave(libraryForm:NgForm){
    
  }

}
