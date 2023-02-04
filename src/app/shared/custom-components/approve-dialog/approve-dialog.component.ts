import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.scss']
})
export class ApproveDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ApproveDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
