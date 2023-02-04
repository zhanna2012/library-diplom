import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar:MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
  openSnackSuccess() {
    this.snackBar.open('Successful!', 'close', { duration: 2000, panelClass: 'successSnack' });
  }

  openSnackError(error: string) {
    this.snackBar.open(error, 'close', { duration: 2000, panelClass: 'errorSnack' });
  }
}
