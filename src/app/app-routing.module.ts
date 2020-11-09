import { BookAddComponent } from './admin-pages/book/book-add/book-add.component';
import { BookListComponent } from './shared/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user-pages/login/login.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { AuthGuard } from '../utils/guard/auth.guard';
import { NonAuthGuard } from '../utils/guard/non-guard.guard';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserListComponent } from './admin-pages/user-list/user-list.component';
import { AuthorListComponent } from './shared/author-list/author-list.component';
import { AuthorAddComponent } from './admin-pages/author/author-add/author-add.component';
import { LibraryAddComponent } from './user-pages/library-add/library-add.component';
import { LibraryListComponent } from './user-pages/library-list/library-list.component';
import { AdminBookUpdateComponent } from './admin-pages/book/admin-book-update/admin-book-update.component';

const routes: Routes = [
  {
    path: 'user',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'authors',
        component: AuthorListComponent,
      },
      {
        path: 'author/add',
        component: AuthorAddComponent,
      },
      {
        path: 'books',
        component: BookListComponent,
      },
      {
        path: 'book/add',
        component: BookAddComponent,
      }
      ,
      {
        path: 'library/add',
        component: LibraryAddComponent,
      }
      ,
      {
        path: 'libraries',
        component: LibraryListComponent,
      }
      ,
      {
        path: 'book/update',
        component: AdminBookUpdateComponent,
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }