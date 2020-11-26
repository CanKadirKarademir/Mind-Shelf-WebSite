import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/utils/services/auth/auth.service';
import { UserService } from '../../../utils/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public uiBasicCollapsed = false;
  public samplePagesCollapsed = false;
  public userName = '';
  public userType: number;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

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
    this.userService
      .userGetById(JSON.parse(localStorage.getItem('currentUser')).id)
      .subscribe(data => {
        this.userName = data['user_data'].UserFirstName + ' ' + data['user_data'].UserLastName;
        this.userType = data['user_data'].UserType;
      })
  }

}
