import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './user-pages/login/login.component';
import { RegisterComponent } from './user-pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserListComponent } from './admin-pages/user-list/user-list.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthorListComponent } from './shared/author-list/author-list.component';
import { BookListComponent } from './shared/book-list/book-list.component';
import { BookAddComponent } from './admin-pages/book/book-add/book-add.component';
import { MatMenuModule } from '@angular/material/menu';
import { AuthorAddComponent } from './admin-pages/author/author-add/author-add.component';
import { LibraryAddComponent } from './user-pages/library-add/library-add.component';
import { LibraryListComponent } from './user-pages/library-list/library-list.component';
import { UserLibraryViewComponent } from './user-pages/user-library-view/user-library-view.component';
import { SummaryAddComponent } from './shared/summary/summary-add/summary-add.component';
import { SummaryListComponent } from './shared/summary/summary-list/summary-list.component';
import { SummaryViewComponent } from './shared/summary/summary-view/summary-view.component';
import { DialogComponent } from './shared/summary/summary-list/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SummaryUpdateComponent } from './shared/summary/summary-update/summary-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    HomeComponent,
    MainComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    AuthorListComponent,
    BookListComponent,
    BookAddComponent,
    AuthorAddComponent,
    LibraryAddComponent,
    LibraryListComponent,
    UserLibraryViewComponent,
    SummaryAddComponent,
    SummaryListComponent,
    SummaryViewComponent,
    DialogComponent,
    SummaryUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
