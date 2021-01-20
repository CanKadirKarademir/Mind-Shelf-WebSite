import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../utils/services/user/user.service';
import { User } from '../../models/user';
import { DeleteWindowComponent } from '../../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) { }

  user: User[];
  searchText = "";

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this._userService.getUsers().subscribe(data => {
      this.user = data;
    })
  }

  userStatusUpdate(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kullanıcıyı aktifleştirmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._userService.userStatusUpdate(id, 1).subscribe(data => {
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

  userDelete(id) {
    const diologResult = this._dialog.open(DeleteWindowComponent, {
      data: {
        message: 'Kullanıcıyı silmek istediğinizden emin misiniz?',
        icon: 'fa fa-exclamation',
      },
    });
    diologResult.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          this._userService.userDelete(id).subscribe(data => {
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
}
