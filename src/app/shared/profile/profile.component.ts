import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  model: User = new User();

  ngOnInit(): void {


  }

  onSave(profileForm: NgForm) {
    profileForm
  }
}
