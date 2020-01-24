import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../app.component';

/**
 * @author sn1p3r
 */
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
