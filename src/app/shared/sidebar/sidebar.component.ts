import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../utils/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private _userService: UserService,
  ) { }

  public userPagesCollapsed = false;
  public libraryPagesCollapsed = false;
  public bookPagesCollapsed = false;
  public autPagesCollapsed = false;
  public summaryPagesCollapsed = false;
  public commentPagesCollapsed = false;
  public userName = '';
  public userType: number;

  ngOnInit() {
    const body = document.querySelector('body');

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
    this.getUserInfo();
  }

  getUserInfo() {
    this._userService
      .userGetById(JSON.parse(localStorage.getItem('currentUser')).id)
      .subscribe(data => {
        this.userName = data['user_data'].UserFirstName + ' ' + data['user_data'].UserLastName;
        this.userType = data['user_data'].UserType;
      })
  }

}
