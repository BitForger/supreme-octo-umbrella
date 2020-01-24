import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {TodoService} from './services/todo/todo.service';
import {interval} from 'rxjs';

export interface DialogData {
  name: string;
  priority: string;
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
    // Bind handlePriorityChange method to this context so we have access to values in this constructed class not the
    //  child todo component class
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
  }

  async ngOnInit(): Promise<void> {
    // load all todos here
    this.todos = await this.todoService.getAll().toPromise();
    this.filterTodos();
  }

  openNewTodoDialog() {
    // create dialog
    const dialogRef = this.dialog.open(NewTodoDialogComponent, {
      width: '400px',
      data: {name: this.name, priority: this.priority}
    });

    // subscribe to closed event and make decision on if we should fail
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        if (!('name' in result) || !result.name) {
          this.snackBar.open('You must specify a name to create a new task', 'Dismiss', {
            duration: 10000,
            verticalPosition: 'top',
          });
          return false;
        }
        if (!('priority' in result) || !result.priority) {
          result.priority = 'low';
        }

        const {status, id, document} = await this.todoService.create(result.name, result.priority).toPromise();
        this.todos.push(document);
        this.filterTodos();
      }
    });
  }

  /**
   * Function to pass into child component to handle the selection change event
   */
  async handlePriorityChange({source, value}, id: string) {
    const todo = this.todos.find(value1 => value1._id.toString() === id);
    if (todo) {
      todo.priority = value;
      await this.todoService.update(todo).toPromise();
      // The found object is mutable so changing the priority like done above only needs a re-filter done
      this.filterTodos();
    }
  }

  /**
   * Just sort the todos
   */
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

  selectRandom() {
    // select random todo
    // show dialog
    const randomTodoIndex = Math.floor(Math.random() * this.todos.length);
    const randomTodo = this.todos[randomTodoIndex];

    const dialogRef = this.dialog.open(GitBitDunComponent, {
      width: '500px',
      data: randomTodo
    });

    dialogRef.afterClosed().subscribe(value => {
      this.snackBar.open('Congrats! You finished it');
    });
  }
}

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './new-todo-dialog.html',
})
export class NewTodoDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewTodoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  cancel() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-git-bit-dun',
  templateUrl: './git-bit-dun-dialog.html',
})
export class GitBitDunComponent {
  timeLeft: number = (60 * 1000) * 30; // 30 minutes
  onePercent = (((60 * 1000) * 30) / 100); // one percent of 30 minutes
  timeLeftValue: number = this.timeLeft / this.onePercent; // find percentage to display in spinner
  constructor(public dialogRef: MatDialogRef<GitBitDunComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    const intervalRef = interval(1000).subscribe(value => {
      this.timeLeft = (this.timeLeft - 1000);
      this.timeLeftValue = this.timeLeft / this.onePercent;

      if (this.timeLeft === 0) {
        intervalRef.unsubscribe(); // kill the interval here
        this.dialogRef.close();
      }
    });
  }
}
