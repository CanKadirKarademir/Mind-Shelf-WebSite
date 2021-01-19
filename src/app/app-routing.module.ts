import { BookAddComponent } from './admin-pages/book/book-add/book-add.component';
import { BookListComponent } from './shared/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './user-pages/login/login.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { AuthGuard } from '../utils/guard/auth/auth.guard';
import { RoleGuard } from '../utils/guard/role/role.guard';
import { NonAuthGuard } from '../utils/guard/non-guard/non-guard.guard';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserListComponent } from './admin-pages/user-list/user-list.component';
import { AuthorListComponent } from './shared/author-list/author-list.component';
import { AuthorAddComponent } from './admin-pages/author/author-add/author-add.component';
import { LibraryAddComponent } from './user-pages/library-add/library-add.component';
import { LibraryListComponent } from './user-pages/library-list/library-list.component';
import { UserLibraryViewComponent } from './user-pages/user-library-view/user-library-view.component';
import { SummaryAddComponent } from './shared/summary/summary-add/summary-add.component';
import { SummaryListComponent } from './shared/summary/summary-list/summary-list.component';
import { SummaryViewComponent } from './shared/summary/summary-view/summary-view.component';
import { SummaryUpdateComponent } from './shared/summary/summary-update/summary-update.component';
import { CommentAddComponent } from './shared/comment/comment-add/comment-add.component';
import { CommentViewComponent } from './shared/comment/comment-view/comment-view.component';
import { CommentUpdateComponent } from './shared/comment/comment-update/comment-update.component';
import { CommentListComponent } from './user-pages/comment-list/comment-list.component';
import {
  ForgotPasswordComponent
} from './../app/user-pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user-pages/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: 'user',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'authors',
        component: AuthorListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'author/add',
        component: AuthorAddComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'author/update/:AuthorID',
        component: AuthorAddComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'books',
        component: BookListComponent,
      },
      {
        path: 'book/add',
        component: BookAddComponent,
        canActivate: [RoleGuard]
      }
      ,
      {
        path: 'library/add',
        component: LibraryAddComponent,
      }
      ,
      {
        path: 'library/update/:LibraryID',
        component: LibraryAddComponent,
      }
      ,
      {
        path: 'libraries',
        component: LibraryListComponent,
      }
      ,
      {
        path: 'book/update/:BookID',
        component: BookAddComponent,
        canActivate: [RoleGuard]
      }
      ,
      {
        path: 'library/view/:LibraryID',
        component: UserLibraryViewComponent,
      }
      ,
      {
        path: 'summary/add/:BookID',
        component: SummaryAddComponent,
      }
      ,
      {
        path: 'summaries',
        component: SummaryListComponent,
      }
      ,
      {
        path: 'summary/view',
        component: SummaryViewComponent,
      }
      ,
      {
        path: 'summary/update/:SummaryID',
        component: SummaryUpdateComponent,
      }
      ,
      {
        path: 'comment/add/:SummaryID',
        component: CommentAddComponent,
      }
      ,
      {
        path: 'comment/view',
        component: CommentViewComponent,
      }
      ,
      {
        path: 'comment/update/:CommentID',
        component: CommentUpdateComponent,
      }
      ,
      {
        path: 'comments/:SummaryID',
        component: CommentListComponent,
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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'reset-password/:UserID',
    component: ResetPasswordComponent,
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
