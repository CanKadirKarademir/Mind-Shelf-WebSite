import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { UserLibraryViewComponent } from './user-library-view/user-library-view.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserLibraryViewComponent, CommentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatMenuModule,
  ]
})
export class UserPagesModule { }
