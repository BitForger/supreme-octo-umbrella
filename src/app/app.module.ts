import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, GitBitDunComponent, NewTodoDialogComponent} from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule, MatProgressSpinnerModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TodoService} from './services/todo/todo.service';
import {FormsModule} from '@angular/forms';
import {LuxonModule} from 'luxon-angular';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NewTodoDialogComponent,
    GitBitDunComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LuxonModule,
  ],
  providers: [
    TodoService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewTodoDialogComponent,
    GitBitDunComponent,
  ]
})
export class AppModule { }
