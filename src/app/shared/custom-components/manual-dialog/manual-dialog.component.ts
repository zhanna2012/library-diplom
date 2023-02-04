import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { ManualMovieModel } from "../../models/manual-movie.model";


@Component({
  selector: 'app-manual-dialog',
  templateUrl: './manual-dialog.component.html',
  styleUrls: ['./manual-dialog.component.scss']
})
export class ManualDialogComponent {

  public data: ManualMovieModel = {
    title: '',
    url: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ManualDialogComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTitle(value: string) {
    this.data.title = value;
  }

  getUrl(value: string) {
    this.data.url = value;
  }


  submitSuggest() {
    this.dialogRef.close(this.data);
  }

}
