import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {TodoService} from './services/todo/todo.service';

export interface DialogData {
  name: string;
  priority: string;
}

enum Priority {
  low,
  medium,
  high
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'IBM-Challenge';

  todos: any[] = [];
  name: string;
  priority: string;

  constructor(public dialog: MatDialog, private readonly todoService: TodoService, private snackBar: MatSnackBar) {
  }

  async ngOnInit(): Promise<void> {
    // load all todos here
    this.todos = await this.todoService.getAll().toPromise();
    console.log('todos', this.todos);
    this.filterTodos();
    console.log('todos', this.todos);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewTodoDialogComponent, {
      width: '400px',
      data: {name: this.name, priority: this.priority}
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('dialog closed', result);
      if (result) {
        if (!('name' in result) || !result.name) {
          this.snackBar.open('You must specify a name to create a new task', 'Dismiss', {
            duration: 10000,
            verticalPosition: 'top',
          });
        }
        if (!('priority' in result) || !result.priority) {
          result.priority = 'low';
        }

        const response = await this.todoService.create(result.name, result.priority).toPromise();
        console.log('response', response);

        this.todos.push({...result, id: response.id});

        this.filterTodos();
      }
    });
  }

  private filterTodos() {
    this.todos.sort((first, second) => {
      if (first.priority === second.priority) {
        return 0;
      }
      if (first.priority === 'medium' && second.priority === 'high') {
        return 0;
      }
      if (first.priority === 'medium' && second.priority === 'low') {
        return -1;
      }
      if (first.priority === 'high' && (second.priority === 'medium' || second.priority === 'low')) {
        return -1;
      }
      if (first.priority === 'low' && (second.priority === 'medium' || second.priority === 'high')) {
        return 1;
      }
    });
  }
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './components/todo/new-todo-dialog.html',
})
export class NewTodoDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewTodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  cancel() {
    this.dialogRef.close();
  }
}
