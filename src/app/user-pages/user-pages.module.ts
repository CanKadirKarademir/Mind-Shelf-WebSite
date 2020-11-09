import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { UserLibraryViewComponent } from './user-library-view/user-library-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserLibraryViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserPagesModule { }
