import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../utils/services/auth/auth.service';
import { UserService } from '../../../utils/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  // tslint:disable-next-line:variable-name
  public userName = '';

  constructor(
    config: NgbDropdownConfig,
    private _router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.getUserInfo()
  }


  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    let body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
      } else {
        body.classList.remove('sidebar-icon-only');
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
      } else {
        body.classList.remove('sidebar-hidden');
      }
    }
  }

  logout() {
    this.authService.logout();
    this._router.navigateByUrl('/home');
  }

  getUserInfo() {
    this.userService
      .userGetById(JSON.parse(localStorage.getItem('currentUser')).id)
      .subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        this.userName = data['user_data'].UserFirstName + ' ' + data['user_data'].UserLastName;
      })
  }
}
