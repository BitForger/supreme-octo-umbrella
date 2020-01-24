import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {interval} from 'rxjs';
import {DialogData} from '../../app.component';

/**
 * @author sn1p3r
 */

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
