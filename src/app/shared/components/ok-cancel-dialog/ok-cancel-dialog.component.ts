import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-cancel-dialog',
  templateUrl: './ok-cancel-dialog.component.html',
  styleUrls: ['./ok-cancel-dialog.component.scss'],
})
export class OkCancelDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OkCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  title: string,
  content: string,
  ok: string,
  cancel: string
}
