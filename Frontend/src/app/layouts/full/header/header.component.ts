import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../../material-component/dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../../../material-component/dialog/change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {

  role: any;

  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) { }

  logout(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
      confirmation: true
    };

    const dialogRef = this.matDialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    });
    dialogRef.afterClosed().subscribe(() => {
      sub.unsubscribe();
    });
  }

  changePassword(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.maxWidth = '100%';

    this.matDialog.open(ChangePasswordComponent, dialogConfig);
  }
}
