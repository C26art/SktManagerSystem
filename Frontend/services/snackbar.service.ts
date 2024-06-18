import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, customClass: string = '') {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      duration: 3000,
      verticalPosition: 'top',
      panelClass: customClass
    });
  }
}
