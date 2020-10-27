import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../utils/services/user/user.service';
import { User } from './user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  user: User[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(data => {
      this.user = data;
    })
  }

  userStatusUpdate(id) {
    this.userService.userStatusUpdate(id, 1).subscribe(data => {
      window.location.reload();
    })
  }

  userDelete(id) {
    this.userService.userDelete(id).subscribe(data => {
      window.location.reload();
    });
  }


}
